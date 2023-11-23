
import React, { useEffect, useState } from 'react'
import { useNotification } from '../../../hooks';
import { get_most_rated_movies } from '../../../api/admin';
import RatingStar from '../../global/RatingStar';
import { convertReviewCount } from '../../../utils/helper';

const MostRatedMovies = () => {
  const [movies,setMovies]=useState([]);
  const { updateNotification } = useNotification();

  const fetchMostRatedMovies = async () => {
    const { error, movies } = await get_most_rated_movies();
    if (error) return updateNotification("error", error);

    setMovies([...movies]);
  };


  useEffect(()=>{
    fetchMostRatedMovies()
  },[])
  return (
    <div className="bg-white shadow dark:shadow dark:bg-secondary p-5 rounded">
      <h1 className="font-semibold text-2xl mb-2 text-primary dark:text-white">
        Most Rated Movies
      </h1>

      <ul className="space-y-3">
        {movies.map((movie) => {
          return (
            <li key={movie.id}>
              <h1 className="dark:text-white text-secondary font-semibold">
                {movie.title}
              </h1>
              <div className="flex space-x-2">
                <RatingStar rating={movie.reviews?.ratingAvg} />
                <p className="text-light-subtle dark:text-dark-subtle">
                  {convertReviewCount(movie.reviews?.reviewCount)} Reviews
                </p>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  )
}

export default MostRatedMovies
