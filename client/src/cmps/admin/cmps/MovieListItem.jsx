import React, { useState } from "react";
import { BsTrash, BsPencilSquare, BsBoxArrowUpRight } from "react-icons/bs";
import { useNotification } from "../../../hooks";

import Btn from "../../global/Btn";
import { delete_movie } from "../../../api/movie";
import ConfirmModal from "../modals/ConfirmModal";
import UpdateMovie from "../modals/UpdateMovie";

const MovieListItem = ({ movie, onEditClick, onDeleteClick }) => {
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [busy, setBusy] = useState(false);
  const [selectedMovieId, setSelectedMovieId] = useState(null);

  const { updateNotification } = useNotification();

  const handleOnDeleteClick = async () => {
    setBusy(true);
    const { error, message } = await delete_movie(movie.id);
    setBusy(false);
  };
  const handleOnEditClick = () => {
    setShowUpdateModal(true);
  };
  const handleOnOpenClick = () => {
    setShowUpdateModal(false);
  };
const handleOnDeleteConfirm=async()=>{

}
  // const displayConfirmModal=()=> setShowConfirmModal(prev=>!prev)
  const displayConfirmModal = () => setShowConfirmModal(false);
  const hideConfirmModal = () => {
    setShowConfirmModal(false);
  };
  return (
    <>
      <MovieCard
        movie={movie}
        onDeleteClick={displayConfirmModal}
        onEditClick={handleOnEditClick}
      />
      <ConfirmModal
        visible={showConfirmModal}
        onCancel={hideConfirmModal}
        onConfirm={handleOnDeleteConfirm}
        busy={busy}
        title="Are you sure?"
        subtitle="This action will remove this movie permanently!"
      />
      <UpdateMovie visible={showUpdateModal} />
    </>
  );
};

export default MovieListItem;

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
                src={poster}
                // src={getPoster(responsivePosters) || poster}
                alt={title}
              />
            </div>
          </td>

          <td className="w-full pl-5">
            <h1 className="text-lg font-semibold text-primary dark:text-white">
              {title}
            </h1>
            <div className="space-x-1">
              {genres.map((g, i) => (
                <span
                  key={g + i}
                  className=" text-primary dark:text-white text-xs"
                >
                  {g}
                </span>
              ))}
            </div>
          </td>
          <td className="px-5">
            <p className="text-primary dark:text-white">{status}</p>
          </td>

          <td>
            <div className="flex items-center space-x-3 text-primary dark:text-white text-lg">
              <Btn onClick={onDeleteClick} type="button">
                <BsTrash />
              </Btn>
              <Btn onClick={onEditClick} type="button">
                <BsPencilSquare />
              </Btn>

              <Btn onClick={onOpenClick} type="button">
                <BsBoxArrowUpRight />
              </Btn>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  );
};
