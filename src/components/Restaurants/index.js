import styled from "styled-components";
import { useCallback, useEffect, useState } from 'react';

import { useFilters } from '../../contexts/FiltersProvider';
import RestaurantCard from './ResturantCard';

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-row-gap: 20px;
  padding-top: 1.6rem;
  padding-bottom: 1.6rem;

  @media (max-width: 768px) {
    grid-template-columns: repeat(1, 1fr);
    justify-content: center;
  }
`;

export default function Restaurants() {
    const { activeFilter } = useFilters();
    const [isLoading, setLoading] = useState(true);
    const [restaurantData, setResturantData] = useState([]);

    useEffect(() => {
        setLoading(true);

        async function loadData() {
            const response = await fetch('https://evening-forest-39803.herokuapp.com/restaurants')
            const data = await response.json();
            setResturantData(data);
            setLoading(false);
        }

        loadData();

    }, [])

    const applySorting = useCallback((resturantA, resturantB) => {
        if (activeFilter === 'Rating') {
            return resturantB.userRating.aggregateRating - resturantA.userRating.aggregateRating
        }
        else if (activeFilter === 'Cost') {
            return resturantB.meta.averageCostForTwo - resturantA.meta.averageCostForTwo
        }
        else {
            return resturantA.id - resturantB.id
        }
    }, [activeFilter])

    const applyFilters = useCallback((resturant) => {
        if (activeFilter === 'Rating: 4.0+') {
            return resturant.userRating.aggregateRating >= 4
        }
        else {
            return resturant !== null
        }
    }, [activeFilter])

    if (restaurantData.length === 0 || isLoading) {
        return <div>Loading...</div>
    }

    return (
        <Container>
            {
                restaurantData
                    .sort((restaurantA, resturantB) => applySorting(restaurantA, resturantB))
                    .sort((restaurantA, resturantB) => resturantB.isOpen - restaurantA.isOpen)
                    .filter((restaurant) => applyFilters(restaurant))
                    .map((properties) => <RestaurantCard key={properties.id} properties={properties} />)
            }
        </Container>
    )
}