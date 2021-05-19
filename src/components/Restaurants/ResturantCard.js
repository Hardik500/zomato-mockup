import { memo, useEffect, useState } from 'react';
import styled from "styled-components";
import { getDistance } from 'geolib';
import RatingComponent from './Rating';
import CuisinesComponent from './Cuisines';
import RatesComponent from './Rates';

const Container = styled.div`
  filter: ${props => !props.isOpen && 'grayscale(100%)'}}
  margin: 0 10px;
  padding: 10px;
  border: 2px solid #fff;
  transition: all .5s ease;
  
  &:hover {
    border-radius: 10px;
    border: 2px solid #d0474a;
  }
`;

const ImageContainer = styled.div`
  height: 20rem;
  width: 25rem;
  overflow: hidden;
  border-radius: 10px;

  @media (max-width: 768px) {
    width: 22.5rem;
    height: 17.5rem;
  }
`;

const RestaurantImage = styled.img`
  max-width: 100%;
  border-radius: 10px;
  transition: transform .5s ease;

  &:hover {
    transform: scale(1.5);
  }

  
`;

const RestaurantTitle = styled.h2`
 margin: 5px 0;
`

function RestaurantCard({ usersPosition, properties }) {
  const { meta, locality, isOpen, userRating } = properties;
  const [time, setTime] = useState(null);

  useEffect(() => {
    if (usersPosition.latitude !== undefined) {

      const distanceInM = getDistance(
        { latitude: usersPosition.latitude, longitude: usersPosition.longitude },
        { latitude: locality.latitude, longitude: locality.longitude },
      )

      const distanceInKM = distanceInM / 1000
      const speed = 5000; //Assume 5000Km/H since distance is HUGE
      const time = distanceInKM / speed;

      setTime(time);
    }
  }, [usersPosition])

  return (
    <Container isOpen={isOpen}>
      <ImageContainer>
        <RestaurantImage src={meta.thumbUrl} />
      </ImageContainer>
      <RestaurantTitle>{meta.title}</RestaurantTitle>
      <RatingComponent numberOfReviews={userRating.numberOfReviews} noOfRating={userRating.aggregateRating} />
      <CuisinesComponent cuisines={meta.cuisines} />
      <RatesComponent currency={meta.currency} averageCostForTwo={meta.averageCostForTwo} time={time} />
    </Container>
  );
}

const MemoizedRocketComponent = memo(RestaurantCard);

export default MemoizedRocketComponent;
