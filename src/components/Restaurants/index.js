import styled from "styled-components";
import { useCallback } from 'react';
import { getDistance } from 'geolib';

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

export default function Restaurants({ usersPosition, data }) {
    const { activeFilter, activeCuisines, searchFilter } = useFilters();

    const applySorting = useCallback((resturantA, resturantB) => {
        if (activeFilter === 'Rating') {
            return resturantB.userRating.aggregateRating - resturantA.userRating.aggregateRating
        }
        else if (activeFilter === 'Cost') {
            return resturantA.meta.averageCostForTwo - resturantB.meta.averageCostForTwo
        }
        else if (activeFilter === 'Delivery Time') {
            const distanceOfA = getDistance(
                { latitude: usersPosition.latitude, longitude: usersPosition.longitude },
                { latitude: resturantA.locality.latitude, longitude: resturantA.locality.longitude },
            )

            const distanceOfB = getDistance(
                { latitude: usersPosition.latitude, longitude: usersPosition.longitude },
                { latitude: resturantB.locality.latitude, longitude: resturantB.locality.longitude },
            )

            return distanceOfA - distanceOfB;
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
        if (searchFilter !== '') {
            if (resturant.meta.title.toLocaleLowerCase().includes(searchFilter.toLocaleLowerCase())) {
                return true;
            }

            if (resturant.meta.cuisines.toLocaleLowerCase().includes(searchFilter.toLocaleLowerCase())) {
                return true;
            }

            return false;
        }

        return resturant !== null
    }, [searchFilter])

    return (
        <Container>
            {
                data
                    .sort((restaurantA, resturantB) => applySorting(restaurantA, resturantB))
                    .sort((restaurantA, resturantB) => resturantB.isOpen - restaurantA.isOpen)
                    .filter((restaurant) => applyFilters(restaurant))
                    .filter((restaurant) => applyCuisineFilters(restaurant))
                    .filter((restaurant) => applyTextFilters(restaurant))
                    .map((properties) => <RestaurantCard key={properties.id} properties={properties} usersPosition={usersPosition} />)
            }
        </Container>
    )
}