import React, { useState, createContext, useContext } from "react";

const FilterContext = createContext({});
export const useFilters = () => useContext(FilterContext);

const FilterProvider = ({ children }) => {

    const [activeFilter, setActiveFilter] = useState(null);

    const toggleActiveFilter = (name) => {
        if (activeFilter === name) {
            setActiveFilter(null);
        }
        else {
            setActiveFilter(name);
        }
    }

    return (
        <FilterContext.Provider value={{
            activeFilter,
            toggleActiveFilter
        }}>
            {children}
        </FilterContext.Provider>
    );
};

export default FilterProvider;