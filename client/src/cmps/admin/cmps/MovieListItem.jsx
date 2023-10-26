/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { BsTrash, BsPencilSquare, BsBoxArrowUpRight } from "react-icons/bs";
import { useMovies, useNotification } from "../../../hooks";

import Btn from "../../global/Btn";
import { delete_movie, get_movie_for_update } from "../../../api/movie";
import ConfirmModal from "../modals/ConfirmModal";
import UpdateMovie from "../modals/UpdateMovie";
import { getPoster } from "../../../utils/helper";

const MovieListItem = ({ movie,onEditClick,onDeleteClick}) => {
  // const [selectedMovie, setSelectedMovie] = useState(null);

  // const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [busy, setBusy] = useState(false);
  const { updateNotification } = useNotification();

  // const {
  // busy,
  // showUpdateModal,
  // showConfirmModal,
  // selectedMovie,
  // displayUpdateModal,
  // displayConfirmModal,
  // hideUpdateModal,
  // hideConfirmModal,
  // } = useMovies();

  // const displayUpdateModal = () => setShowUpdateModal(true);
  const displayConfirmModal = () => setShowConfirmModal(true);
  // const hideUpdateModal = () => setShowUpdateModal(false);
  const hideConfirmModal = () => setShowConfirmModal(false);


  console.log(movie?.id);
  console.log("initialState");
  //  console.log(initialState);


  return (
    <>
      <MovieCard
        movie={movie}
        onDeleteClick={displayConfirmModal}
        onEditClick={onEditClick}
      />
      {/* <div className="p-0">
        <UpdateMovie visible={visibleUpdateModal} initialState={initialState} />
        <ConfirmModal
          visible={showConfirmModal}
          busy={busy}
          title="Are you sure?"
          subtitle="This action will remove this movie permanently!"
        />
      </div> */}
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
              <Btn onClick={onDeleteClick} type="button" className="">
                <BsTrash />
              </Btn>
              <Btn onClick={onEditClick} type="button" className="">
                <BsPencilSquare />
              </Btn>
              <Btn onClick={onOpenClick} type="button" className="">
                <BsBoxArrowUpRight />
              </Btn>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default MovieListItem;
