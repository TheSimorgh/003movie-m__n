/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { ImSpinner3 } from "react-icons/im";

const Submit_Btn = ({ value, busy, type, onClick, className="" })=> {

  return (
    <button type={type || "submit"} onClick={onClick}
    className={className}
    >
    {busy ? <ImSpinner3 className="animate-spin" /> : value}

    </button>
  )
}

export default Submit_Btn
