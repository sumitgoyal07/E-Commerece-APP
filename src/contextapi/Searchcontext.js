import { useState, createContext, useContext, } from "react";

const SearchContext = createContext();

const SearchProvider = (props) => {

    const [values, setValues] = useState({
        keyword: "",  
        result: []
    });


    return (
        <SearchContext.Provider value={[values, setValues]}>
            {props.children}
        </SearchContext.Provider>

    )
};

const useSearch = () => useContext(SearchContext);

export { useSearch, SearchProvider };
