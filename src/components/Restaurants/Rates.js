import styled from "styled-components";

const Container = styled.div`
  margin: 5px 0;
  color: #696969;
  font-size: 18px;
`;

export default function RatesComponent({ currency, averageCostForTwo }) {
  const averagePriceForOne = averageCostForTwo / 2

  return (
    <Container>
      <div>
        {currency}
        {averagePriceForOne} per person
      </div>
    </Container>
  );
}
