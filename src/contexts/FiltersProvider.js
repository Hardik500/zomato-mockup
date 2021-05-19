import React, { useState, createContext, useContext } from "react";

const FilterContext = createContext({});
export const useFilters = () => useContext(FilterContext);

const FilterProvider = ({ children }) => {

    const [activeFilter, setActiveFilter] = useState(null);
    const [activeCuisines, setActiveCuisines] = useState({});
    const [textFilter, setTextFilter] = useState('');

    const toggleActiveFilter = (filterName) => {
        if (activeFilter === filterName) {
            setActiveFilter(null);
        }
        else {
            setActiveFilter(filterName);
        }
    }

    const toggleCuisines = (cuisineName) => {
        if (activeCuisines?.[cuisineName] === true) {
            setActiveCuisines({ ...activeCuisines, [cuisineName]: false })
        }
        else {
            setActiveCuisines({ ...activeCuisines, [cuisineName]: true })
        }
    }

    return (
        <FilterContext.Provider value={{
            activeFilter,
            toggleActiveFilter,
            activeCuisines,
            toggleCuisines,
            textFilter,
            setTextFilter
        }}>
            {children}
        </FilterContext.Provider>
    );
};

export default FilterProvider;