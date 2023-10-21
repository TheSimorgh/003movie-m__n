import React from 'react'
import ModalContainer from '../../global/ModalContainer'
import MovieForm from "../MovieForm";
const UpdateMovie = ({visible}) => {
  return (
   <ModalContainer visible={visible}  >
      <MovieForm />

   </ModalContainer>
  )
}

export default UpdateMovie
