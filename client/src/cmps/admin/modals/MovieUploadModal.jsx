/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

import { useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import { AiOutlineCloudUpload } from "react-icons/ai";

import ModalContainer from "../../global/ModalContainer";
import { useMovies, useNotification, useSearch } from "../../../hooks";
import { upload_movie, upload_trailer } from "../../../api/movie";
import MovieForm from "../MovieForm";
import { useNavigate } from "react-router-dom";
const MovieUploadModal = ({ visible, onClose }) => {
  const [videoSelected, setVideoSelected] = useState(false);
  const [videoUploaded, setVideoUploaded] = useState(false);
  const [videoInfo, setVideoInfo] = useState({});
  const [uploadProgress, setUploadProgress] = useState(0);
  const [busy, setBusy] = useState(false);
  const {fetch_movies}=useMovies()
  const { updateNotification } = useNotification();
  const navigation=useNavigate()
  const resetState = () => {
    setVideoSelected(false);
    setVideoUploaded(false);
    setUploadProgress(0);
    setVideoInfo({});
  };

  const handleChange = (file) => {
    const formData = new FormData();
    formData.append("video", file);
    setVideoSelected(true);
    handleUploadTrailer(formData);
  };

  const handleTypeError = (error) => {
    updateNotification("error", error);
  };

  const handleUploadTrailer = async (data) => {
    const { error, url, public_id } = await upload_trailer(
      data,
      setUploadProgress
    );
    if (error) return updateNotification("error", error);

    setVideoUploaded(true);
    setVideoInfo({ url, public_id });
  };

  const getUploadProgressValue = () => {
    if (!videoUploaded && uploadProgress >= 100) {
      return "Processing";
    }
    return `Upload progress ${uploadProgress}%`;
  };
  const handleSubmit = async (data) => {
    if (!videoInfo.url || !videoInfo.public_id)
      return updateNotification("error", "Trailer is missing");
    setBusy(true);
    data.append("trailer", JSON.stringify(videoInfo));
    const { error, movie } = await upload_movie(data);
    setBusy(false);
    if (error) return updateNotification("error", error);
    updateNotification("success", "Movie upload successfully");
    fetch_movies()
    resetState();
    navigation("/")
    onClose();
  };
  return (
    <ModalContainer
      visible={visible}
      // onClose={onClose
    >
      <div className="mb-5">
        <UploadProgress
          visible={!videoUploaded && videoSelected}
          message={getUploadProgressValue()}
          width={uploadProgress}
        />
      </div>
      {!videoSelected ? (
        <TrailerSelector
          visible={!videoSelected}
          onTypeError={handleTypeError}
          handleChange={handleChange}
        />
      ) : (
        <MovieForm btnTitle={"Upload"} busy={busy} onSubmit={!busy ? handleSubmit : null} />
      )}
    </ModalContainer>
  );
};
export default MovieUploadModal;

const TrailerSelector = ({ visible, handleChange, onTypeError }) => {
  if (!visible) return null;

  return (
    <div className="h-full  flex items-center justify-center">
      <FileUploader
        handleChange={handleChange}
        onTypeError={onTypeError}
        types={["mp4", "avi"]}
      >
        <label className="w-48 h-48 border border-dashed dark:border-dark-subtle border-light-subtle rounded-full flex flex-col items-center justify-center dark:text-dark-subtle text-secondary cursor-pointer">
          <AiOutlineCloudUpload size={80} />
          <p>Drop your file here!</p>
        </label>
      </FileUploader>
    </div>
  );
};

const UploadProgress = ({ width, message, visible }) => {
  if (!visible) return null;

  return (
    <div className="dark:bg-secondary bg-white drop-shadow-lg rounded p-3">
      <div className="relative h-3 dark:bg-dark-subtle bg-light-subtle overflow-hidden">
        <div
          style={{ width: width + "%" }}
          className="h-full absolute left-0 dark:bg-white bg-secondary"
        />
      </div>
      <p className="font-semibold dark:text-dark-subtle text-light-subtle animate-pulse mt-1">
        {message}
      </p>
    </div>
  );
};
