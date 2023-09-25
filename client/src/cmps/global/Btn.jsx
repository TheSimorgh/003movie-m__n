/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { ImSpinner3 } from "react-icons/im";

const Btn = ({ value, children, busy, type, onClick, ...rest})=> {
  const text=()=>{
    return value ? value : children
  }
  return (
    <button type={type || "button"} onClick={onClick}
    className="bg-secondary dark:bg-white dark:text-primary text-white px-1 rounded"
    {...rest}
    >
    {/* {busy ? <ImSpinner3 className="animate-spin" /> : value} */}
    {text()}
    </button>
  )
}

export default Btn
