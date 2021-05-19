import React, { useState, createContext, useContext } from "react";
import usePersistedState from 'use-persisted-state-hook'

const FilterContext = createContext({});
export const useFilters = () => useContext(FilterContext);

const FilterProvider = ({ children }) => {

    const [activeFilter, setActiveFilter] = usePersistedState('activeFilter', null);
    const [activeCuisines, setActiveCuisines] = usePersistedState('activeCuisines', {});
    const [searchFilter, setSearchFilter] = usePersistedState('searchFilter', '');

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
            searchFilter,
            setSearchFilter
        }}>
            {children}
        </FilterContext.Provider>
    );
};

export default FilterProvider;