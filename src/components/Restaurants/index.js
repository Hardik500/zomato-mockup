import styled from "styled-components";
import { useCallback } from 'react';

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

export default function Restaurants({ data }) {
    const { activeFilter } = useFilters();


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

    return (
        <Container>
            {
                data
                    .sort((restaurantA, resturantB) => applySorting(restaurantA, resturantB))
                    .sort((restaurantA, resturantB) => resturantB.isOpen - restaurantA.isOpen)
                    .filter((restaurant) => applyFilters(restaurant))
                    .map((properties) => <RestaurantCard key={properties.id} properties={properties} />)
            }
        </Container>
    )
}