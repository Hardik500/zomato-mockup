import { BsStar } from "react-icons/bs";
import styled from "styled-components";
import RatingComponent from './Rating';
import CuisinesComponent from './Cuisines';
import RatesComponent from './Rates';

const Container = styled.div`
  filter: ${props => !props.isOpen && 'grayscale(100%)'}}
  margin: 0 10px;
`;

const ImageContainer = styled.div``;

const RestaurantImage = styled.img`
  width: 25rem;
  height: 20rem;
  border-radius: 10px;
  object-fit: cover;

  @media (max-width: 768px) {
    width: 22.5rem;
    height: 17.5rem;
  }
`;

const RestaurantTitle = styled.h2`
 margin: 5px 0;
`

export default function RestaurantCard({ properties }) {
  const { meta, locality, isOpen, userRating } = properties;

  console.log(properties);

  return (
    <Container isOpen={isOpen}>
      <ImageContainer>
        <RestaurantImage src={meta.thumbUrl} />
      </ImageContainer>
      <RestaurantTitle>{meta.title}</RestaurantTitle>
      <RatingComponent numberOfReviews={userRating.numberOfReviews} noOfRating={userRating.aggregateRating} />
      <CuisinesComponent cuisines={meta.cuisines} />
      <RatesComponent currency={meta.currency} averageCostForTwo={meta.averageCostForTwo} />
    </Container>
  );
}
