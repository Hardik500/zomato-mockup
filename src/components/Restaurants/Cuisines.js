import styled from "styled-components";

const Container = styled.div`
  margin: 7.5px 0;
  font-size: 18px;
`;

export default function CuisinesComponent({ cuisines }) {
    return <Container>{cuisines}</Container>;
}
