/* eslint-disable react/prop-types */
import { createContext, useState } from "react";
import { get_movies, search_movie } from "../api/movie";
import { useNotification, useSearch } from "../hooks";

export const MovieContext = createContext();

const limit = 10;
let currentPageNo = 0;

const MoviesProvider = ({ children }) => {
  const [movies, setMovies] = useState([]);
  const [latestUploads, setLatestUploads] = useState([]);
  const [searchResults, setSearchResult] = useState([]);
  const [reachedToEnd, setReachedToEnd] = useState(false);

  const { updateNotification } = useNotification();
  const { resetSearch,handleSearch,resultNotFound } = useSearch();

  const fetch_latest_movies = async (qty = 5) => {
    const { error, movies } = await get_movies(0, qty);
    if (error) return updateNotification("error", error);
    setLatestUploads([...movies]);
  };

  const fetch_movies = async (pageNo = currentPageNo) => {
    const { error, movies } = await get_movies(pageNo, limit);
    if (error) updateNotification("error", error);
    if (!movies.length) {
      currentPageNo = pageNo - 1;
      return setReachedToEnd(true);
    }

    setMovies([...movies]);
  };

  const fetch_next_page = () => {
    if (reachedToEnd) return;
    currentPageNo += 1;
    fetch_movies(currentPageNo);
  };
  const fetch_prev_page = () => {
    if (currentPageNo <= 0) return;
    if (reachedToEnd) setReachedToEnd(false);

    currentPageNo -= 1;
    fetch_movies(currentPageNo);
  };
  const handleOnSearchSubmit = (value) => {
    handleSearch(search_movie, value, setSearchResult);
  };
  const handleSearchFormReset = () => {
    resetSearch();
    setSearchResult([]);
  };

  return (
    <MovieContext.Provider
      value={{
        movies,
        searchResults,
        latestUploads,
        fetch_latest_movies,
        fetch_movies,
        fetch_next_page,
        fetch_prev_page,
        handleOnSearchSubmit,
        handleSearchFormReset,
      }}
    >
      {children}
    </MovieContext.Provider>
  );
};

export default MoviesProvider;
