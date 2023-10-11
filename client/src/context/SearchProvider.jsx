/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { createContext, useState } from "react";
import { useNotification } from "../hooks";

export const SearchContext = createContext();

let timeoutId;
const debounce = (func, delay) => {
  return (...args) => {
    if (timeoutId) clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func.apply(null, args);
    }, delay);
  };
};

const SearchProvider = ({ children }) => {
  const [searching, setSearching] = useState(false);
  const [resultNotFound, setResultNotFound] = useState(false);
  const [results, setResults] = useState([]);
  const { updateNotification } = useNotification();

  const search = async (method, query, updaterFun) => {
    const { error, results } = await method(query);
    if (error) return updateNotification("error", error);

    if (!results.length) {
      setResults([]);
      updaterFun && updaterFun([]);
      return setResultNotFound(true);
    }

    setResultNotFound(false);
    setResults(results);
    updaterFun && updaterFun([...results]);
  };

  const debounceFunc = debounce(search, 300);

  const handleSearch = (method, query, updaterFun) => {
    setSearching(true);
    if (!query.trim()) {
      updaterFun && updaterFun([]);
      return resetSearch();
    }

    debounceFunc(method, query, updaterFun);
  };
  const resetSearch = () => {
    setSearching(false);
    setResultNotFound(false);
    setResults([]);
  };
  return (
    <SearchContext.Provider
      value={{ searching, results, resultNotFound, handleSearch, resetSearch }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export default SearchProvider;
