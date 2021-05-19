import styled from "styled-components";
import { useEffect, useState } from "react";
import { BsSearch } from 'react-icons/bs';

import Filter from "./Filter";
import Cuisines from "./Cuisines";
import { useFilters } from "../../contexts/FiltersProvider";

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
  align-items: center;
`;

const CuisinesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const SearchFilterContainer = styled.div`
  display: flex;
  align-items: center;
  height: 35px;
  width: 20rem;
  border: 1px solid rgb(207, 207, 207);
  border-radius: 0.4rem;
  padding: 0px 10px;
`

const SearchFilter = styled.input`
  font-size: 16px;
  padding: 0px 10px;
  width: 100%;
  height: 100%;
  color: rgb(156, 156, 156);
  border: 0px solid;
  outline: none;
`

export default function Filters({ data }) {
    const { activeFilter, toggleActiveFilter, searchFilter, setSearchFilter, activeCuisines, toggleCuisines } = useFilters();
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

                <SearchFilterContainer>
                    <BsSearch />
                    <SearchFilter value={searchFilter} type="text" placeholder="Enter Place Name or Cuisine Name" onChange={(e) => setSearchFilter(e.target.value)} />
                </SearchFilterContainer>
            </FiltersContainer>

            <Heading>Available Cuisines</Heading>

            <CuisinesContainer>
                {availableCuisines.map((cuisine) => (
                    <Cuisines key={cuisine} cuisine={cuisine} isActive={activeCuisines[cuisine] === true} toggleCuisines={toggleCuisines} />
                ))}
            </CuisinesContainer>
        </Container>
    );
}
