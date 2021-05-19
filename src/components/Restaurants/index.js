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
    const { activeFilter, activeCuisines, textFilter } = useFilters();


    const applySorting = useCallback((resturantA, resturantB) => {
        if (activeFilter === 'Rating') {
            return resturantB.userRating.aggregateRating - resturantA.userRating.aggregateRating
        }
        else if (activeFilter === 'Cost') {
            return resturantB.meta.averageCostForTwo - resturantA.meta.averageCostForTwo
        }
    }, [activeFilter])

    const applyCuisineFilters = useCallback((resturant) => {
        if (Object.values(activeCuisines).filter(e => e === true).length === 0) {
            return true;
        }

        const cuisines = resturant.meta.cuisines.split(",").map(e => e.trim());

        for (let cuisine of cuisines) {
            if (activeCuisines[cuisine] === true) {
                return true;
            }
        }

        return false;

    }, [activeCuisines])

    const applyFilters = useCallback((resturant) => {
        if (activeFilter === 'Rating: 4.0+') {
            return resturant.userRating.aggregateRating >= 4
        }
        else if (activeFilter === 'Available') {
            return resturant.isOpen
        }

        return resturant !== null
    }, [activeFilter])

    const applyTextFilters = useCallback((resturant) => {
        if (textFilter !== '') {
            if (resturant.meta.title.toLocaleLowerCase().includes(textFilter)) {
                return true;
            }

            if (resturant.meta.cuisines.toLocaleLowerCase().includes(textFilter)) {
                return true;
            }

            return false;
        }

        return resturant !== null
    }, [textFilter])

    return (
        <Container>
            {
                data
                    .sort((restaurantA, resturantB) => applySorting(restaurantA, resturantB))
                    .sort((restaurantA, resturantB) => resturantB.isOpen - restaurantA.isOpen)
                    .filter((restaurant) => applyFilters(restaurant))
                    .filter((restaurant) => applyCuisineFilters(restaurant))
                    .filter((restaurant) => applyTextFilters(restaurant))
                    .map((properties) => <RestaurantCard key={properties.id} properties={properties} />)
            }
        </Container>
    )
}