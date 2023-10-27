import React, { useState,useEffect } from 'react'
import MovieListItem from './MovieListItem'
import { delete_movie, get_all_movies, get_movie_for_update, get_movies } from '../../../api/movie';
import { useMovies, useNotification } from '../../../hooks';


const items=[]
const pageNo=0;
const limit=5
const LatestUploads = () => {
   // const [movies, setMovies] = useState([]);
  // const [busy, setBusy] = useState(false);
  // const [showConfirmModal, setShowConfirmModal] = useState(false);
  // const [showUpdateModal, setShowUpdateModal] = useState(false);
  // const [selectedMovie, setSelectedMovie] = useState(null);
  // const { updateNotification } = useNotification();

  const { fetch_latest_movies, latestUploads } = useMovies();

  // const fetch_latest_movies = async () => {
  //   const { error, movies } = await get_movies(pageNo, limit);
  //   if (error) return updateNotification(error);

  //   setMovies([...movies]);
  // };
  

  // const handleOnDeleteClick = (movie) => {
  //   setSelectedMovie(movie);
  //   setShowConfirmModal(true);
  // };

  
  // const handleOnEditClick = async ({ id }) => {
  //   const { movie, error } = await get_movie_for_update(id);
  //   setShowUpdateModal(true);

  //   if (error) return updateNotification("error", error);

  //   setSelectedMovie(movie);
  // };

  
  // const handleOnDeleteConfirm = async () => {
  //   setBusy(true);
  //   const { error, message } = await delete_movie(selectedMovie.id);
  //   setBusy(false);

  //   if (error) return updateNotification("error", error);

  //   updateNotification("success", message);
  //   fetchLatestUploads();
  //   hideConfirmModal();
  // };

  // const handleOnUpdate = (movie) => {
  //   const updatedMovies = movies.map((m) => {
  //     if (m.id === movie.id) return movie;
  //     return m;
  //   });

  //   setMovies([...updatedMovies]);
  // };

  // const hideConfirmModal = () => setShowConfirmModal(false);
  // const hideUpdateModal = () => setShowUpdateModal(false);



  useEffect(() => {
    fetch_latest_movies();
  }, []);

  return (
<>
<div className="bg-white shadow dark:shadow dark:bg-secondary p-5 rounded col-span-2">
             <h1 className="font-semibold text-2xl mb-2 text-primary dark:text-white">
          Recent Uploads
        </h1>

        <div className="space-y-3">
            {latestUploads.map((e,i)=>(
                <MovieListItem key={i} movie={e} />
            ))}
        </div>
    </div>

          {/* <ConfirmModal
        title="Are you sure?"
        subtitle="This action will remove this movie permanently!"
        visible={showConfirmModal}
        onCancel={hideConfirmModal}
        onConfirm={handleOnDeleteConfirm}
        busy={busy}
      />

      <UpdateMovie
        visible={showUpdateModal}
        onClose={hideUpdateModal}
        initialState={selectedMovie}
        onSuccess={handleOnUpdate}
      /> */}
  
</>
  )
}

export default LatestUploads