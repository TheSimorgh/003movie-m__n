/* eslint-disable react/prop-types */
import React from "react";
import Input from "../form/Input";
import Label from "../form/Label";
import { commonPosterUI } from "../../utils/theme";

const PosterSelector = ({
  name,
  onChange,
  label,
  accept,
  selectedPoster,
  className,
}) => {
  return (
    <div>
      <Input
        type="file"
        hidden
        id={name}
        name={name}
        accept={accept}
        onChange={onChange}
      />

      <Label htmlFor={name}>
        {selectedPoster ? (
          <img             className={commonPosterUI + " object-cover " + className}
          src={selectedPoster} alt={name} />
        ) : <PosterUI className={className} label={label}/>}
      </Label>
    </div>
  );
};

export default PosterSelector;

const PosterUI = ({ label, className }) => {
  return (
    <div className={commonPosterUI + " " + className}>
      <span className="dark:text-dark-subtle text-light-subtle">{label}</span>
    </div>
  );
};
