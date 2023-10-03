/* eslint-disable react/prop-types */
import { useNotification } from "../../../hooks";
import ModalContainer from "../../global/ModalContainer"
import ActorForm from "../ActorForm"
import React, { useState } from "react";


const ActorCreateModal = ({visible,onClose}) => {
  const [busy, setBusy] = useState(false);
const handleSubmit=async(data)=>{
  setBusy(true)
  const {error,actor}=await 
}
 
  return (   
    <ModalContainer visible={visible} onClose={onClose} >
        <ActorForm  busy={busy} title="Create New Actor" btnTitle="Create" onSubmit={!busy ? handleSubmit : null} /> 
    </ModalContainer>

  )
}

export default ActorCreateModal
