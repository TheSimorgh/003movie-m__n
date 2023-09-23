/* eslint-disable no-unused-vars */
import { Outlet } from "react-router-dom";


import { useState } from "react";
import NavbarAdm from "../../admin/NavbarAdm";
import Header from "../../admin/Header";
import ActorCreateModal from "../../admin/modals/ActorCreateModal";
import MovieUploadModal from "../../admin/modals/MovieUploadModal";


const MainLayoutAdmin = () => {
  const [showMovieUploadModal, setShowMovieUploadModal] = useState(false);
  const [showActorCreateModal, setShowActorCreateModal] = useState(false);

  const toggleMovieUploadModal = () => {
    setShowMovieUploadModal((prev) => !prev);
  };
  const toggleActorCreateModal = () => {
    setShowActorCreateModal((prev) => !prev);
  };
  return (
    <>
      <div className="flex dark:bg-primary bg-white ">
        <NavbarAdm />
        <div className="flex-1 max-w-screen-xl">
          <Header
            onAddMovieClick={toggleMovieUploadModal}
            onAddActorClick={toggleActorCreateModal}
          />
          <Outlet />
        </div>
      </div>
      <ActorCreateModal
        visible={showActorCreateModal}
        onClose={toggleActorCreateModal}
      />
      <MovieUploadModal
        visible={showMovieUploadModal}
        onClose={toggleMovieUploadModal}
      />
    </>
  );
};

export default MainLayoutAdmin;
