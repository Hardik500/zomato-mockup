import './App.css';

import styled from 'styled-components';
import Filters from './components/Filters';
import Restaurants from './components/Restaurants';
import AppProvider from './contexts/AppProvider';

const Container = styled.div`
  position: relative;
  max-width: 80rem;
  max-height: initial;
  margin: 0px auto;
`

const RestaurantTitle = styled.h1`
  margin: 0;
  font-weight: 600;
`

function App() {
  return (
    <AppProvider>
      <Container>
        <Filters />
        <RestaurantTitle>Akola Restaurants</RestaurantTitle>
        <Restaurants />
      </Container>
    </AppProvider>
  );
}

export default App;
