/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { BsTrash, BsPencilSquare, BsBoxArrowUpRight } from "react-icons/bs";
import { useMovies, useNotification } from "../../../hooks";

import Btn from "../../global/Btn";
import { delete_movie, get_movie_for_update } from "../../../api/movie";
import ConfirmModal from "../modals/ConfirmModal";
import UpdateMovie from "../modals/UpdateMovie";
import { getPoster } from "../../../utils/helper";

const MovieListItem = ({
  movie,
  afterDelete,
  afterUpdate,

  // onEditClick,onDeleteClick
}) => {
  // const [selectedMovie, setSelectedMovie] = useState(null);

  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [busy, setBusy] = useState(false);
  const { updateNotification } = useNotification();
  const [selectedMovieId, setSelectedMovieId] = useState(null);

  const {fetch_movies}=useMovies()
  const displayUpdateModal = () => setShowUpdateModal(true);
  const hideUpdateModal = () => setShowUpdateModal(false)
 const displayConfirmModal = () => setShowConfirmModal(true);
  const hideConfirmModal = () => setShowConfirmModal(false)
  const toggleConfirmModal=()=>setShowConfirmModal(prev=>!prev)


  const {
    // busy,
    // showUpdateModal,
    // showConfirmModal,
    setMovies,
    movies,
    selectedMovie,
    setSelectedMovie,
    // displayUpdateModal,
    // displayConfirmModal,
    // hideUpdateModal,
    // hideConfirmModal,
  } = useMovies();

  // const displayUpdateModal = () => setShowUpdateModal(true);
  // const displayConfirmModal = () => setShowConfirmModal(true);
  // const hideUpdateModal = () => setShowUpdateModal(false);
  // const hideConfirmModal = () => setShowConfirmModal(false);
  console.log("movie?.id");
  console.log(movie?.id);

  //  console.log(initialState);

  const handleOnDeleteConfirm = async () => {
    setBusy(true);
    const { error, message, del_movie } = await delete_movie(movie?.id);
    setBusy(false);
    if (error) return updateNotification("error", error);
    
    hideConfirmModal()
    updateNotification("success", `${message }`);
  fetch_movies(movie)
  
  };
  // const handleOnDeleteClick = (movie) => {
  //   console.log(movie);
  //   setSelectedMovie(movie);
  //   displayConfirmModal();
  //   console.log(showConfirmModal);
  // };

  // console.log(selectedMovie);

  // const handleOnUpdate = (movie) => {
  //   const updatedMovies = movies.map((m) => {
  //     if (m.id === movie.id) return movie;
  //     return m;
  //   });

  //   setMovies([...updatedMovies]);
  // };

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

  const handleOnEditClick = () => {
    displayUpdateModal();
    setSelectedMovieId(movie.id);
    console.log("ID Selected");
    console.log(selectedMovieId);
  };

  const handleOnUpdate = (movie) => {
    afterUpdate(movie);
    hideUpdateModal();
    setSelectedMovieId(null);
  };

  // useEffect(()=>{
  //   console.log("selectedMovieId");
  //   console.log(selectedMovieId);
  //   console.log(movie);
  //   if(movie) setSelectedMovieId(movie?.id)
  // },[selectedMovieId])
  return (
    <>
      <MovieCard
        movie={movie}
        // onDeleteClick={onDeleteClick}
        // onEditClick={onEditClick}
        // onDeleteClick={displayConfirmModal}
        onDeleteClick={toggleConfirmModal}
        onEditClick={handleOnEditClick}
      />
      <div className="p-0">
        <UpdateMovie
          visible={showUpdateModal}
          movieId={selectedMovieId}
          onClose={hideUpdateModal}
          onSuccess={handleOnUpdate}
        />
        <ConfirmModal
          visible={showConfirmModal}
          busy={busy}
          onConfirm={handleOnDeleteConfirm}
          onCancel={hideConfirmModal}
          title="Are you sure?"
          subtitle="This action will remove this movie permanently!"
        />
      </div>
    </>
  );
};

const MovieCard = ({ movie, onDeleteClick, onEditClick, onOpenClick }) => {
  const { poster, title, responsivePosters, genres = [], status } = movie;
  return (
    <table className="w-full border-b">
      <tbody>
        <tr>
          <td>
            <div className="w-24">
              <img
                className="w-full aspect-video"
                src={getPoster(responsivePosters) || poster}
                alt={title}
              />
            </div>
          </td>

          <td className="w-full pl-5">
            <div>
              <h1 className="text-lg font-semibold text-primary dark:text-white">
                {title}
              </h1>
              <div className="space-x-1">
                {genres.map((g, index) => {
                  return (
                    <span
                      key={g + index}
                      className=" text-primary dark:text-white text-xs"
                    >
                      {g}
                    </span>
                  );
                })}
              </div>
            </div>
          </td>

          <td className="px-5">
            <p className="text-primary dark:text-white">{status}</p>
          </td>

          <td>
            <div className="flex items-center space-x-3 text-primary dark:text-white text-lg">
              <button onClick={onDeleteClick} type="button" className="">
                <BsTrash />
              </button>
              <button onClick={onEditClick} type="button" className="">
                <BsPencilSquare />
              </button>
              <button onClick={onOpenClick} type="button" className="">
                <BsBoxArrowUpRight />
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default MovieListItem;
