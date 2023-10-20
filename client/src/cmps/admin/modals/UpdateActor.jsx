/* eslint-disable react/prop-types */
import {  update_actor } from "../../../api/actor";
import { useNotification } from "../../../hooks";
import ModalContainer from "../../global/ModalContainer";
import ActorForm from "../ActorForm";
import  {  useState } from "react";

const UpdateActor = ({ visible, initialState, onSuccess, onClose }) => {
  const [busy, setBusy] = useState(false);
  const { updateNotification } = useNotification();
  const handleSubmit = async (data) => {
    setBusy(true);
    const { error, actor } = await update_actor(initialState.id, data);
    setBusy(false);
    if (error) return updateNotification("error", error);
    onSuccess(actor);
    updateNotification("success", "Actor created successfully.");
    onClose();
  };

  return (
    <ModalContainer visible={visible} onClose={onClose} ignoreContainer>
      <ActorForm
        busy={busy}
        title="Update Actor"
        btnTitle="Update"
        onSubmit={!busy ? handleSubmit : null}
        initialState={initialState}
      />
    </ModalContainer>
  );
};

export default UpdateActor;
