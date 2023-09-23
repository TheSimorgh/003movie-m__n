/* eslint-disable react/prop-types */

import { commonInputClasses } from "../../utils/theme"



const Input = ({ onChange,value,name,id,type="text",placeholder="Search Profile",className="", ...rest}) => {
  return (
    <input
    id={id}
    type={type}
    name={name}
    placeholder={placeholder}
    className={` ${className}`}
    {...rest}
    value={value}
    onChange={onChange}
    />
          
  
  )
}

export default Input
