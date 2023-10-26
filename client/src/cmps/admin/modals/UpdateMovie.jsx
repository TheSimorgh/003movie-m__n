import { useState } from "react";
import { update_movie } from "../../../api/movie";
import { useMovies, useNotification } from "../../../hooks";
import ModalContainer from "../../global/ModalContainer";
import MovieForm from "../MovieForm";
const UpdateMovie = ({ visible,   onSuccess,onClose, }) => {
  // const {id}=initialState
 const {selectedMovie,
  // busy, setBusy,displayUpdateModal,showUpdateModal
  }=useMovies()
  const { updateNotification } = useNotification();
// const {id}=selectedMovie
const [busy, setBusy] = useState(false);
  const handleSubmit = async (data) => {
    setBusy(true);
    const { error, movie, message } = await update_movie(selectedMovie.id, data);
    setBusy(false);
    if (error) return updateNotification("error", error);
    console.log("Error");
    console.log(error);
    console.log("MOvie");
    console.log(movie);
    console.log("Message");
    console.log(message);
    updateNotification("success", message);
    onSuccess(movie);
  //  setTimeout(()=>{
  //   onClose()
  //  },1500)
   onClose()
  };


  return (
    <ModalContainer visible={visible}>
      <MovieForm
        btnTitle="Update"
        initialStat={selectedMovie}
        onSubmit={!busy ? handleSubmit : null}
        busy={busy}
      />
    </ModalContainer>
  );
};

export default UpdateMovie;
