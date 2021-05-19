import mockData from './mockData.json'
import RestaurantCard from './ResturantCard';
import styled from "styled-components";
import { useEffect, useState } from 'react';

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-row-gap: 20px;
  padding-top: 1.6rem;
  padding-bottom: 1.6rem;
`;

export default function Restaurants() {

    const [restaurantData, setResturantData] = useState(mockData);

    useEffect(() => {
        let dummyResturantData = restaurantData;

        //Sort by Open
        dummyResturantData.sort((a, b) => b.isOpen - a.isOpen)

        setResturantData(dummyResturantData)

    }, [])

    return (
        <Container>
            {
                restaurantData.map((properties) => <RestaurantCard key={properties.id} properties={properties} />)
            }
        </Container>
    )
}