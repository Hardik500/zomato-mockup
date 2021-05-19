import React from "react";
import FiltersProvider from './FiltersProvider'

const AppProvider = ({ children }) => {
    return (
        <FiltersProvider>
            {children}
        </FiltersProvider>
    );
};

export default AppProvider;