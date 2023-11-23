import React, { useState } from "react";
import ModalContainer from "../../global/ModalContainer";
import { RatingForm } from "../..";
import { useNotification } from "../../../hooks";

const EditRatingModal = ({ visible, initialState, onSuccess, onClose }) => {
  const [busy, setBusy] = useState(false);
  const { updateNotification } = useNotification();
  const handleSubmit = async () => {};
  return (
    <ModalContainer>
      <RatingForm
        busy={busy}
        initialState={initialState}
        onSubmit={handleSubmit}
      />
    </ModalContainer>
  );
};

export default EditRatingModal;
