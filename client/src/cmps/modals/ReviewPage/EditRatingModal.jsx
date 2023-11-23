import React, { useState } from "react";
import ModalContainer from "../../global/ModalContainer";
import { RatingForm } from "../..";
import { useNotification } from "../../../hooks";
import { update_review } from "../../../api/review";

const EditRatingModal = ({ visible, initialState, onSuccess, onClose }) => {
  const [busy, setBusy] = useState(false);
  const { updateNotification } = useNotification();
  const handleSubmit = async (data) => {
    setBusy(true);
    const { error, message } = await update_review(initialState.id, data);
    setBusy(false);
    if (error) return updateNotification("error", error);

    onSuccess({ ...data });
    updateNotification("success", message);
    onClose();
  };
  return (
    <ModalContainer visible={visible} onClose={onClose} ignoreContainer>
      <RatingForm
        busy={busy}
        initialState={initialState}
        onSubmit={handleSubmit}
      />
    </ModalContainer>
  );
};

export default EditRatingModal;
