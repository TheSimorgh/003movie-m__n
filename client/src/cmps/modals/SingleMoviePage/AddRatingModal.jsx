import React from "react";
import ModalContainer from "../../global/ModalContainer";
import { RatingForm } from "../..";
import { useParams } from "react-router-dom";
import { add_review } from "../../../api/review";
import { useNotification } from "../../../hooks";
// const ratings = new Array(10).fill("");

const AddRatingModal = ({ visible, onClose, onSuccess }) => {
  const {movieId}=useParams();
  const { updateNotification } = useNotification();


  const handleSubmit=async(data)=>{
    const {error,message,reviews}=await add_review(movieId)
    if (error) return updateNotification("error", error);

    updateNotification("success", message);
    onSuccess(reviews);
    onClose();
  }
  return (
    <ModalContainer visible={visible} onClose={onClose} ignoreContainer>
      <RatingForm onSubmit={handleSubmit} />
    </ModalContainer>
  );
};

export default AddRatingModal;
