/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import {
  delete_movie,
  get_all_movies,
  get_movies,
  update_movie,
} from "../../api/movie";
import { NextAndPrevBtn, MovieListItem } from "..";
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
  } = useMovies();


  useEffect(()=>{
    fetch_movies(currentPageNo)
  })
  return (
    <>
      <div className="space-y-3 p-5">
        {newMovies.map((movie,i)=>(
          <MovieListItem key={movie.id}  movie={movie} />
        ))}
         <NextAndPrevBtn className="mt-5" onNextClick={fetch_latest_movies} onPrevClick={fetch_prev_page} /> 
        
      </div>;
    </>
  );
};

export default MoviesCmp;
