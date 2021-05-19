import styled from "styled-components";

const Container = styled.div`
  display: flex;
  align-items: center;
  margin: 5px 0;
  color: #696969;
  font-size: 18px;
`;

const RatesContainer = styled.div``;

const Seperator = styled.div`
  margin-right: 10px;
  margin-left: 10px;
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background-color: #696969;
`;

const DistanceContainer = styled.div``;

export default function RatesComponent({ currency, averageCostForTwo, time }) {
  const averagePriceForOne = averageCostForTwo / 2;
  const timeInMinutes = parseInt(time * 60);

  return (
    <Container>
      <RatesContainer>
        {currency}
        {averagePriceForOne} per person
      </RatesContainer>
      {timeInMinutes ? <>
        <Seperator />
        <DistanceContainer>{timeInMinutes} min</DistanceContainer>
      </>
        : null}
    </Container>
  );
}
