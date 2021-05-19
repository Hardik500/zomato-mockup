import styled from "styled-components";
import ReactTooltip from 'react-tooltip';

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

const ToolTipTheme = styled.span`
  font-size: 17px;
`

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
        <DistanceContainer data-tip="This is not wrong, as the speed is 5000Km/hr here 😛" data-for='averageTime'>{timeInMinutes} min</DistanceContainer>
      </>
        : null}

      <ReactTooltip id='averageTime' backgroundColor='#d0474a'>
        <ToolTipTheme>This is not wrong, as the speed is 5000Km/hr here 😛</ToolTipTheme>
      </ReactTooltip>
    </Container>
  );
}
