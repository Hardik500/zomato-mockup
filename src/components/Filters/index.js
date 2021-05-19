import Filter from "./Filter";
import { RiArrowUpDownFill } from "react-icons/ri";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding-top: 1.6rem;
  padding-bottom: 1.6rem;
  position: sticky;
  background-color: rgb(255, 255, 255);
  z-index: 2;
  transition: top 0.5s ease-in-out 0s;

  @media (max-width: 768px) {
    justify-content: center;
  }
`;

export default function Filters() {
    const filtersAvailable = [
        {
            name: "Rating: 4.0+",
            type: "Button",
        },
        {
            name: "Safe and Hygienic",
            type: "Button",
        },
        {
            name: "Delivery Time",
            icon: <RiArrowUpDownFill />,
            type: "Sort",
        },
        {
            name: "Rating",
            type: "Range",
        },
        {
            name: "Cost",
            type: "Range",
        },
    ];

    return (
        <Container>
            {filtersAvailable.map((properties) => (
                <Filter key={properties.name} properties={properties} />
            ))}
        </Container>
    );
}
