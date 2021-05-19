import { RiArrowUpDownFill } from "react-icons/ri";
import styled from "styled-components";
import Filter from "./Filter";
import Cuisines from "./Cuisines";
import { useFilters } from "../../contexts/FiltersProvider";
import { useEffect, useState } from "react";

const Container = styled.div`
  background-color: rgb(255, 255, 255);
  z-index: 2;
  transition: top 0.5s ease-in-out 0s;

  @media (max-width: 768px) {
    justify-content: center;
  }
`;

const Heading = styled.h1`
  font-size: 24px;
`

const FiltersContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const CuisinesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

export default function Filters({ data }) {
    const { activeFilter, toggleActiveFilter, activeCuisines, toggleCuisines } = useFilters();
    const [availableCuisines, setCuisines] = useState([]);

    const filtersAvailable = [
        {
            name: "Rating: 4.0+",
            type: "Button",
        },
        {
            name: "Available",
            type: "Button",
        },
        {
            name: "Delivery Time",
            type: "Sort",
        },
        {
            name: "Rating",
            type: "Sort",
        },
        {
            name: "Cost",
            type: "Sort",
        },
    ];

    useEffect(() => {
        if (data.length) {
            let tempCuisineData = new Set();

            for (let i = 0; i < data.length; i++) {
                const cuisines = data[i].meta.cuisines.split(",").map((e) => e.trim());
                cuisines.forEach((item) => tempCuisineData.add(item));
            }

            setCuisines([...tempCuisineData]);
        }
    }, [data]);

    return (
        <Container>
            <Heading>Available Filters</Heading>
            <FiltersContainer>
                {filtersAvailable.map((properties) => (
                    <Filter
                        isActive={activeFilter === properties.name}
                        setActiveFilter={toggleActiveFilter}
                        key={properties.name}
                        properties={properties}
                    />
                ))}
            </FiltersContainer>

            <Heading>Available Cuisines</Heading>

            <CuisinesContainer>
                {availableCuisines.map((cuisine) => (
                    <Cuisines cuisine={cuisine} isActive={activeCuisines[cuisine] === true} toggleCuisines={toggleCuisines} />
                ))}
            </CuisinesContainer>
        </Container>
    );
}
