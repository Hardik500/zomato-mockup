import mockData from './mockData.json'
import RestaurantCard from './ResturantCard';
import styled from "styled-components";

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-row-gap: 20px;
  padding-top: 1.6rem;
  padding-bottom: 1.6rem;
`;

export default function Restaurants() {

    return (
        <Container>
            {
                mockData.map((properties) => <RestaurantCard key={properties.id} properties={properties} />)
            }
        </Container>
    )
}