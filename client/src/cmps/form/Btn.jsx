/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { ImSpinner3 } from "react-icons/im";

const Btn = ({ value, busy, type, onClick, ...rest})=> {

  return (
    <button type={type || "button"} onClick={onClick}
    className="bg-secondary dark:bg-white dark:text-primary text-white px-1 rounded"
    {...rest}
    >
    {/* {busy ? <ImSpinner3 className="animate-spin" /> : value} */}

    </button>
  )
}

export default Btn
