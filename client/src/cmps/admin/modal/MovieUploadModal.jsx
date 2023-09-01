/* eslint-disable no-unused-vars */

import { FileUploader } from "react-drag-drop-files";
import { AiOutlineCloudUpload } from "react-icons/ai";
import React, { useState } from "react";
import { useNotification } from "../../../hooks";
import { upload_trailer } from "../../../api/movie";
import ModalContainer from "../../global/ModalContainer";

const MovieUploadModal = ({ visible, onClose }) => {
  const [videoSelected, setVideoSelected] = useState(false);
  const [videoUploaded, setVideoUploaded] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const { updateNotification } = useNotification();
  const [videoInfo, setVideoInfo] = useState({});
  const [busy, setBusy] = useState(false);

  const handleTypeError = (error) => {
    updateNotification("error", error);
  };
  console.log(!videoSelected);

  const handleUploadTrailer = async (data) => {
    const { error, url, public_id } = await upload_trailer(data,setUploadProgress);
    if (error) return updateNotification("error", error);
    setVideoUploaded(true);
    setVideoInfo({ url, public_id });
  
  };

  const handleChange = (file) => {
    const formData = new FormData();
    formData.append("video", file);

    setVideoSelected(true);
    handleUploadTrailer(formData);
  };

  const getUploadProgressValue=()=>{
    if(!videoUploaded && uploadProgress >=100){
      return "Processing"
    }
    return `Upload progress ${uploadProgress}`
  }

  const handleSubmit=async(data)=>{
    if (!videoInfo.url || !videoInfo.public_id)
    return updateNotification("error", "Trailer is missing!");

  }
  return (
    <ModalContainer visible={visible}>
      <div className="mb-5">
        <UploadProgress
             visible={!videoUploaded && videoSelected}
        width={uploadProgress} 
        message={getUploadProgressValue()}
        />
      </div>
      <TrailerSelector
        visible={!videoSelected}
        handleChange={handleChange}
        onTypeError={handleTypeError}
      />
    </ModalContainer>
  );
};

export default MovieUploadModal;

const TrailerSelector = ({ visible, handleChange, onTypeError }) => {
  if (!visible) return null;

  return (
    <div className="h-full flex items-center justify-center">
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
