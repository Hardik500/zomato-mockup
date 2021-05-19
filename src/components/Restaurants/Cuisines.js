import { useState, useEffect } from "react";
import styled from "styled-components";
import { useFilters } from "../../contexts/FiltersProvider";
import Cuisines from '../Filters/Cuisines';

const CuisinesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    margin-top: 15px;
  }

`;

export default function CuisinesComponent({ cuisines }) {
  const [availableCuisines, setCuisines] = useState([]);
  const { activeCuisines, toggleCuisines } = useFilters();

  useEffect(() => {
    if (cuisines.length) {
      let tempCuisineData = new Set();
      const cuisinesArr = cuisines.split(",").map((e) => e.trim());
      cuisinesArr.forEach((item) => tempCuisineData.add(item));
      setCuisines([...tempCuisineData]);
    }
  }, [cuisines]);

  return (
    <CuisinesContainer>
      {availableCuisines.map((cuisine) => (
        <Cuisines key={cuisine} cuisine={cuisine} isActive={activeCuisines[cuisine] === true} toggleCuisines={toggleCuisines} />
      ))}
    </CuisinesContainer>
  )
}
