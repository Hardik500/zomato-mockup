import './App.css';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import Filters from './components/Filters';
import Restaurants from './components/Restaurants';
import AppProvider from './contexts/AppProvider';

const Container = styled.div`
  position: relative;
  max-width: 80rem;
  max-height: initial;
  margin: 0px auto;

  @media (max-width: 768px) {
    margin: 0px 10px;
  }
`

const RestaurantTitle = styled.h1`
  margin: 0;
  font-weight: 600;
`

function App() {

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

  if (restaurantData.length === 0 || isLoading) {
    return <div>Loading...</div>
  }

  return (
    <AppProvider>
      <Container>
        <Filters data={restaurantData} />
        <RestaurantTitle>Akola Restaurants</RestaurantTitle>
        <Restaurants data={restaurantData} />
      </Container>
    </AppProvider>
  );
}

export default App;
