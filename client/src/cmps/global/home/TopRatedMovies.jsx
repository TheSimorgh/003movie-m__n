import React, { useEffect,useState } from 'react'
import { useNotification } from '../../../hooks'
import MovieList from '../MovieList';
import { get_top_rated_movies } from '../../../api/movie';

const TopRatedMovies = () => {
  const [movies, setMovies] = useState([]);
  const { updateNotification } = useNotification();

  const fetch_movies=async (signal)=>{
    const {error,movies}=await get_top_rated_movies(null,signal)
    if (error) return updateNotification("error", error);
    setMovies([...movies])
  }
  useEffect(()=>{
    const ac = new AbortController();
    fetch_movies(ac.signal)
    return ()=>{
      ac.abort()
    }
  },[])

  return (
    <MovieList  movies={movies} title="Viewers choice (Movies)"  />
  )







}

export default TopRatedMovies