import React, { useEffect, useState } from "react";
import { get_related_movies } from "../../api/movie";
import { useNotification } from "../../hooks";
import MovieList from "./MovieList";

const RelatedMovies = ({movieId}) => {
    const [movies, setMovies] = useState([]);
    const { updateNotification } = useNotification();
  
    const fetchRelatedMovies = async () => {
      const { error, movies } = await get_related_movies(movieId);
      if (error) return updateNotification("error", error);
  
      setMovies([...movies]);
    };
  
    useEffect(() => {  
      if (movieId) fetchRelatedMovies();
    }, [movieId]);
    return <MovieList title="Related Movies" movies={movies} />;
  }
  
export default RelatedMovies