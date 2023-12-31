import { useState, useEffect } from "react";
import { search_for_admin } from "../../api/movie";

import { MovieListItem, NotFoundText } from "../../cmps";
import {  useSearchParams } from "react-router-dom";
import { useNotification } from "../../hooks";
const SearchMoviesAdm = () => {
  const [movies, setMovies] = useState([]);
  const [resultNotFound, setResultNotFound] = useState(false);
  const { updateNotification } = useNotification();

  const [searchParams] = useSearchParams();
  const query = searchParams.get("title");
  console.log(query);
  const fetch_movie = async (text) => {
    const { results, error } = await search_for_admin(text);
    if (error) return updateNotification("error", error);
    if (!results.length) {
      setResultNotFound(true);
      return setMovies([]);
    }
    console.log(results);
    // updateNotification("success", "Found");
    setMovies([...results]);
  };
  useEffect(() => {
    if (query.trim()) fetch_movie(query);
  }, [query]);

  const handleAfterDelete=(movie)=>{
    const updatedMovies=movies.filter((m)=>m.id !==movie.id)
    setMovies([...updatedMovies])
  }
  const handleAfterUpdate=(movie)=>{
    const updatedMovies=movies.map((m)=>{
      if(m.id===movie.id) return movie;
      return m
    })
    setMovies([...updatedMovies])
  }
  return (
    <div className="p-5 space-y-3">
      <NotFoundText visible={resultNotFound} text="Record not found!" /> 
       {!resultNotFound
        ? movies.map((movie) => {
            return <MovieListItem movie={movie} key={movie.id} afterDelete={handleAfterDelete} afterUpdate={handleAfterUpdate} />;
          })
        : null}
       
    </div>
  );
};

export default SearchMoviesAdm;
