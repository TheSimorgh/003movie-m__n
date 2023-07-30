/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
const defaultInputStyle =
  "dark:border-dark-subtle border-light-subtle dark:focus:border-white focus:border-primary dark:text-white text-lg";

const NavSearchForm = ({
    onSubmit,
    onReset,
    inputClassName = defaultInputStyle,
    placeholder,
}) => {
    const [value, setValue] = useState("");
    const handleOnSubmit = (e) => {
        e.preventDefault();
        onSubmit(value);
      };
      const handleReset = () => {
        setValue("");
        onReset();
      };
    
  return (
    <form className="relative" onSubmit={handleOnSubmit}>
        <input 
          type="text"
          className={
            "border-2 transition bg-transparent rounded p-1 outline-none " +
            inputClassName
          }
          placeholder={placeholder}
          value={value}
          onChange={({ target }) => setValue(target.value)}
        />

    </form>
  )
}

export default NavSearchForm