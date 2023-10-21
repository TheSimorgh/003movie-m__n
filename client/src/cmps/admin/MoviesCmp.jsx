/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import {
  delete_movie,
  get_all_movies,
  get_movies,
  update_movie,
} from "../../api/movie";
import { NextAndPrevBtn, MovieListItem, SearchFormAdm, NotFoundText } from "..";
import { useNotification } from "../../hooks";
import { useMovies } from "../../hooks";
const limit = 10;
let currentPageNo = 0;
const MoviesCmp = () => {
  const { updateNotification } = useNotification();
  const {
    movies: newMovies,
    latestUploads,
    fetch_latest_movies,
    fetch_movies,
    fetch_next_page,
    fetch_prev_page,
    resultNotFound,
    searchResults,
    handleOnSearchSubmit,
    handleSearchFormReset,
  } = useMovies();

  useEffect(() => {
    fetch_movies(currentPageNo);
  });
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
                <MovieListItem key={movie.id} movie={movie} />
              ))
            : newMovies.map((movie) => (
                <MovieListItem key={movie.id} movie={movie} />
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
      
    </>
  );
};

export default MoviesCmp;
