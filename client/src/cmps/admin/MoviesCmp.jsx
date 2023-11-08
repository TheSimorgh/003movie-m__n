/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import {
  delete_movie,
  get_all_movies,
  get_movie_for_update,
  get_movies,
  update_movie,
} from "../../api/movie";
import {
  NextAndPrevBtn,
  MovieListItem,
  SearchFormAdm,
  NotFoundText,
  ConfirmModal,
  UpdateMovie,
} from "..";
import { useNotification } from "../../hooks";
import { useMovies } from "../../hooks";
const limit = 10;
let currentPageNo = 0;
const MoviesCmp = () => {
  const [busy, setBusy] = useState(false);
  // const [selectedMovie, setSelectedMovie] = useState(null);
  // const [showUpdateModal, setShowUpdateModal] = useState(false);
  // const [showConfirmModal, setShowConfirmModal] = useState(false);
  const { updateNotification } = useNotification();

  const {
    movies,
    setMovies,
    latestUploads,
    fetch_latest_movies,
    fetch_movies,
    fetch_next_page,
    fetch_prev_page,
    resultNotFound,
    searchResults,
    handleOnSearchSubmit,
    handleSearchFormReset,
    // setInfo,
    // info,

    //  handleOnDeleteClick,
    // handleOnEditClick,

    //   busy, setBusy,
    selectedMovie,
    setSelectedMovie,
    //   showUpdateModal,
    //   showConfirmModal,
    //   displayUpdateModal,
    //   displayConfirmModal,
    //   hideUpdateModal,
    //   hideConfirmModal,
  } = useMovies();

  // const displayUpdateModal = () => setShowUpdateModal(true);
  // const displayConfirmModal = () => setShowConfirmModal(true);
  // const hideUpdateModal = () => setShowUpdateModal(false);
  // const hideConfirmModal = () => setShowConfirmModal(false);

  // const handleOnEditClick = async (movie) => {
  //   const { result, error } = await get_movie_for_update(movie.id);
  //   if (error) updateNotification("error", error);
  //   setSelectedMovie(result);
  //   displayUpdateModal();
  //   // setBusy(prev=>!prev)
  //   // console.log("Info");
  //   // console.log(info);

  //   // setInfo(prev=>!prev)
  //   // console.log("Info");
  //   // console.log(info);
  // };

  // const handleOnDeleteConfirm = async () => {
  //   setBusy(true);

  //   const { error, message,del_movie } = await delete_movie(selectedMovie.id);

  //   setBusy(false);
  //   if (error) return updateNotification("error", error);
  //   updateNotification("success", `${message}`) ;
  //   hideConfirmModal();
  //   fetch_movies(currentPageNo);
  // };
  // const handleOnDeleteClick = (movie) => {
  //   console.log(movie);
  //   setSelectedMovie(movie);
  //   displayConfirmModal();
  //   console.log(showConfirmModal);
  // };
  // // console.log(selectedMovie);

  // const handleOnUpdate = (movie) => {
  //   const updatedMovies = movies.map((m) => {
  //     if (m.id === movie.id) return movie;
  //     return m;
  //   });

  //   setMovies([...updatedMovies]);
  // };

  const handleUIUpdate=()=>{
    fetch_movies()
  }
  useEffect(() => {
    fetch_movies(currentPageNo);
  }, []);
  // useEffect(() => {
  //   console.log("useEffect");
  //   console.log(selectedMovie);

  // }, [selectedMovie]);
  return (
    <>
      <div className="space-y-3 p-5  ">
        <div className="flex justify-end">
          <SearchFormAdm
            onReset={handleSearchFormReset}
            onSubmit={handleOnSearchSubmit}
            placeholder="Search Movies..."
            showResetIcon={searchResults.length || resultNotFound}
          />
        </div>
        <NotFoundText visible={resultNotFound} text="Record not found" />
        <div>
          {searchResults?.length || resultNotFound
            ? searchResults.map((movie) => (
              <MovieListItem
              key={movie.id}
              movie={movie}
              afterDelete={handleUIUpdate}
              afterUpdate={handleUIUpdate}
              // initialState={selectedMovie}
              // onDeleteClick={() => handleOnDeleteClick(movie)}
              // onEditClick={() => handleOnEditClick(movie)}
              // visibleUpdateModal={showUpdateModal}
            />
              ))
            : movies.map((movie) => (
                <MovieListItem
                  key={movie.id}
                  movie={movie}
                  afterDelete={handleUIUpdate}
                  afterUpdate={handleUIUpdate}
                  // initialState={selectedMovie}
                  // onDeleteClick={() => handleOnDeleteClick(movie)}
                  // onEditClick={() => handleOnEditClick(movie)}
                  // visibleUpdateModal={showUpdateModal}
                />
              ))}
        </div>

        {!searchResults.length && !resultNotFound ? (
          <NextAndPrevBtn
            className="mt-5"
            onNextClick={fetch_next_page}
            onPrevClick={fetch_prev_page}
          />
        ) : null}
      </div>
      {/* <div className="p-0">
        <UpdateMovie
          visible={showUpdateModal}
          //initialState={selectedMovie} if i sending the initial state  inside the child element is it is null or undefined to prevent tis i am calling selected movie inside the child cmp
          onSuccess={handleOnUpdate}
          onClose={hideUpdateModal}
          // busy={busy}
          // setBusy={setBusy}
        />
        <ConfirmModal
          busy={busy}
          visible={showConfirmModal}
          onClose={hideConfirmModal}
          onConfirm={handleOnDeleteConfirm}
          title="Are you sure?"
          subtitle="This action will remove this movie permanently!"
        />
      </div> */}
    </>
  );
};

export default MoviesCmp;
