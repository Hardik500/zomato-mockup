import { useEffect, useState } from 'react';
import { BsStarFill } from "react-icons/bs";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  align-items: flex-end;
`;

const RatingStar = styled.div`
  background: ${props => props.ratingStyle};
  padding: 2px 4px;
  border-radius: 5px;
  margin-right: 5px;
`;

const RatingContainer = styled.div`
  display: flex;
  align-items: flex-end;
  margin-right: 5px;
`;

const RatingNumber = styled.div`
  font-weight: 700;
  font-size: 17px;
`;

const ReviewsContainer = styled.div`
  font-size: 17px;
  color: #a1a1a1;
`;

export default function RatingComponent({ numberOfReviews, noOfRating }) {
    const [ratingStyles, setRatingStyles] = useState([]);
    const fullColor = '#d0474a';
    const partialColor = '#972829';
    const noColor = '#cfcfcf'
    const backgroundColor = `#343739`


    useEffect(() => {
        let tempStylesArr = [];

        for (let i = 1; i <= 5; i++) {
            if (noOfRating >= i) {
                tempStylesArr.push(fullColor)
            }
            else if (Math.ceil(noOfRating) === i) {
                const percentageOfColor = parseInt((1 - (i - noOfRating)) * 100)

                const color = `linear-gradient(
                    to right,
                    ${partialColor} ${percentageOfColor}%,
                    black ${percentageOfColor}%,
                    ${backgroundColor} ${percentageOfColor}%,
                    ${backgroundColor} ${percentageOfColor}%,
                    ${backgroundColor} 100%
                    );`

                tempStylesArr.push(color)
            }
            else {
                tempStylesArr.push(noColor)
            }
        }

        setRatingStyles(tempStylesArr);

    }, [noOfRating])

    return (
        <Container>
            <RatingContainer>
                {
                    ratingStyles.map((ratingStyle, index) => (
                        <RatingStar key={index} ratingStyle={ratingStyle}>
                            <BsStarFill fill="white" />
                        </RatingStar>
                    ))
                }
                <RatingNumber>{noOfRating}</RatingNumber>
            </RatingContainer>

            <ReviewsContainer>({numberOfReviews} Delivery Reviews)</ReviewsContainer>
        </Container>
    );
}
