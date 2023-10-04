/* eslint-disable react/prop-types */
import { create_actor } from "../../../api/actor";
import { useNotification } from "../../../hooks";
import ModalContainer from "../../global/ModalContainer"
import ActorForm from "../ActorForm"
import React, { useState } from "react";


const ActorCreateModal = ({visible,onClose}) => {
  const [busy, setBusy] = useState(false);
  const { updateNotification } = useNotification();
const handleSubmit=async(data)=>{
  setBusy(true)
 const {error,actor}=await create_actor(data)
 setBusy(false)
 if (error) return updateNotification("error", error);
 updateNotification("success", "Actor created successfully.");
  onClose()
}
 
  return (   
    <ModalContainer visible={visible} onClose={onClose} ignoreContainer >
        <ActorForm  busy={busy} title="Create New Actor" btnTitle="Create" onSubmit={!busy ? handleSubmit : null} /> 
    </ModalContainer>

  )
}

export default ActorCreateModal
