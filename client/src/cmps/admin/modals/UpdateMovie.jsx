import { useEffect, useState } from "react";
import { get_movie_for_update, update_movie } from "../../../api/movie";
import { useMovies, useNotification } from "../../../hooks";
import ModalContainer from "../../global/ModalContainer";
import MovieForm from "../MovieForm";
const UpdateMovie = ({ visible, movieId, onSuccess, onClose }) => {
  // const {id}=initialState
  const {
    selectedMovie,
    setSelectedMovie,
    // busy, setBusy,displayUpdateModal,showUpdateModal
  } = useMovies();
  const { updateNotification } = useNotification();
  // const {id}=selectedMovie
  const [busy, setBusy] = useState(false);
  const [ready, setReady] = useState(false);
  const handleSubmit = async (data) => {
    setBusy(true);
    const { error, movie, message } = await update_movie(
      // selectedMovie.id,
      movieId,
      data
    );
    setBusy(false);
    if (error) return updateNotification("error", error);
    // console.log("Error");
    // console.log(error);
    // console.log("MOvie");
    // console.log(movie);
    // console.log("Message");
    // console.log(message);
    updateNotification("success", message);
    onSuccess(movie);
    //  setTimeout(()=>{
    //   onClose()
    //  },1500)
    onClose();
  };

  const fetch_movie_to_update = async () => {
    // const { result, error } = await get_movie_for_update(movie.id);
    const { result, error } = await get_movie_for_update(movieId);
    if (error) updateNotification("error", error);
    setReady(true);
    setSelectedMovie(result);

    // displayUpdateModal();
    // setBusy(prev=>!prev)
    // console.log("Info");
    // console.log(info);

    // setInfo(prev=>!prev)
    // console.log("Info");
    // console.log(info);
  };

  useEffect(() => {
    if (movieId) fetch_movie_to_update();
  }, [movieId]);
  return (
    <ModalContainer visible={visible}>
      {ready ? (
        <MovieForm
          btnTitle="Update"
          initialStat={selectedMovie}
          onSubmit={!busy ? handleSubmit : null}
          busy={busy}
        />
      ) : (
        <div className="w-full h-full flex justify-center items-center">
          <p className="text-light-subtle dark:text-dark-subtle animate-pulse text-xl">
            Please wait...
          </p>
        </div>
      )}
    </ModalContainer>
  );
};

export default UpdateMovie;
