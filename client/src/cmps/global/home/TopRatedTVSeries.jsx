import React, { useEffect,useState } from 'react'
import { useNotification } from '../../../hooks'
import MovieList from '../MovieList';
import { get_top_rated_movies } from '../../../api/movie';

const TopRatedTVSeries = () => {
  const [movies, setMovies] = useState([]);
  const { updateNotification } = useNotification();


  const fetch_movies=async (signal)=>{
    const {error,movies}=await get_top_rated_movies("TV Series", signal);
    if (error) return updateNotification("error", error);
    setMovies([...movies])
  }
  useEffect(()=>{
    fetch_movies()
    console.log(movies);
  },[])
  console.log("movies");
  console.log(movies);
  return <MovieList  movies={movies} title="Viewers choice (TV Series)"  />



}
export default TopRatedTVSeries
