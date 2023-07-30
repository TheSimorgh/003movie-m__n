/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { ImSpinner3 } from "react-icons/im";

const Submit_Btn = ({type,onClick,value}) => {
  return (
    <button type={type || "submit"} onClick={onClick} >
      {value}
    </button>
  )
}

export default Submit_Btn
