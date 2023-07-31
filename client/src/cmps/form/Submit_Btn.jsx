/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { ImSpinner3 } from "react-icons/im";

const Submit_Btn = ({type,onClick,value}) => {
  return (
    <button type={type || "submit"} onClick={onClick}
    className="w-full rounded mt-3 dark:bg-white bg-secondary dark:text-secondary text-white hover:bg-opacity-90 transition font-semibold text-lg cursor-pointer h-10 flex items-center justify-center"
    >
      {value}
    </button>
  )
}

export default Submit_Btn
