/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";
import { get_movie_for_update, get_movies, search_movie } from "../api/movie";
import { useNotification, useSearch } from "../hooks";

export const MovieContext = createContext();

const limit = 10;
let currentPageNo = 0;

const MoviesProvider = ({ children }) => {
  const [movies, setMovies] = useState([]);
  const [latestUploads, setLatestUploads] = useState([]);
  const [searchResults, setSearchResult] = useState([]);
  const [reachedToEnd, setReachedToEnd] = useState(false);
  const [info,setInfo]=useState(false)
  
  //  const [busy, setBusy] = useState(false);
   const [selectedMovie, setSelectedMovie] = useState(null);
  //  const [showUpdateModal, setShowUpdateModal] = useState(false);
  //  const [showConfirmModal, setShowConfirmModal] = useState(false);

  //Hooks
  const { updateNotification } = useNotification();
  const { resetSearch, handleSearch, resultNotFound } = useSearch();

  //API requests for movies----------------------------------------------------------------
  const fetch_latest_movies = async (qty = 5) => {
    const { error, movies } = await get_movies(0, qty);
    if (error) return updateNotification("error", error);
    setLatestUploads([...movies]);
  };

  const fetch_movies = async (pageNo = currentPageNo) => {
    const { error, movies } = await get_movies(pageNo, limit);
    if (error) updateNotification("error", error);
    if (!movies.length) {
      (prev) => !prev;
      currentPageNo = pageNo - 1;
      return setReachedToEnd(true);
    }

    setMovies([...movies]);
  };

  //Pagination----------------------------------------------------------------
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
  //API for Searching ----------------------------------------------------------
  const handleOnSearchSubmit = (value) => {
    handleSearch(search_movie, value, setSearchResult);
  };
  const handleSearchFormReset = () => {
    resetSearch();
    setSearchResult([]);
  };

  //----------------------------------------------------------------

  // const handleOnEditClick = async (movie) => {
  //   const { result, error } = await get_movie_for_update(movie.id);
  //  if (error) updateNotification("error", error);
  //  console.log(result);
  //  setSelectedMovie(result);
  //  setBusy(true)
  //  console.log(busy);

  //   displayUpdateModal();
  //   console.log(selectedMovie);
 
  // };
  // const handleOnDeleteClick = (movie) => {
  //   console.log(movie);
  //   console.log("handleOnDeleteClick");busy
  // };

  // const displayUpdateModal = () => setShowUpdateModal(prev=>!prev);
  // const displayConfirmModal = () => setShowConfirmModal(true);
  // const hideUpdateModal = () => setShowUpdateModal(prev=>!prev);
  // const hideConfirmModal = () => setShowConfirmModal(false);

  return (
    <MovieContext.Provider
      value={{
        movies,
        setMovies,
        searchResults,
        latestUploads,
        fetch_latest_movies,
        fetch_movies,
        fetch_next_page,
        fetch_prev_page,
        handleOnSearchSubmit,
        handleSearchFormReset,
        resultNotFound,
        setInfo,info,
        // busy,
        // setBusy,

      

        // handleOnDeleteClick,
        // handleOnEditClick,
        setSelectedMovie,
        selectedMovie,

        // showUpdateModal,
        // showConfirmModal,
        // displayUpdateModal,
        // displayConfirmModal,
        // hideUpdateModal,
        // hideConfirmModal,
      }}
    >
      {children}
    </MovieContext.Provider>
  );
};

export default MoviesProvider;
