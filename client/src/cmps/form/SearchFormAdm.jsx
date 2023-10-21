/* eslint-disable react/prop-types */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import Input from "./Input";
import Btn from "../global/Btn";
const defaultInputStyle =
  "dark:border-dark-subtle border-light-subtle dark:focus:border-white focus:border-primary dark:text-white text-lg";

const SearchFormAdm = ({
  placeholder,
  showResetIcon,
  inputClassName = defaultInputStyle,
  onSubmit,
  onReset,
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
  // const showResetIcon=true
  return (
    <form className="relative" onSubmit={handleOnSubmit}>
      <Input
        type="text"
        className={
          "border-2 transition bg-transparent rounded p-1 outline-none " +
          inputClassName
        }
        placeholder={placeholder}
        value={value}
        onChange={({ target }) => setValue(target.value)}
      />
      {showResetIcon ? (
        <Btn
          onClick={handleReset}
          type="button"
          className="absolute top-1/2 -translate-y-1/2 right-2 text-secondary dark:text-white"
        >
          {value.length ? <AiOutlineClose /> : null}
        </Btn>
      ) : null}
    </form>
  );
};

export default SearchFormAdm;
