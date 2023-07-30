/* eslint-disable react/prop-types */


 const CustomBtnLink=({ label, clickable = true, onClick })=> {
  const className = clickable
    ? "text-highlight dark:text-highlight-dark hover:underline"
    : "text-highlight dark:text-highlight-dark cursor-default";

  return (
    <button onClick={onClick} className={className} type="button">
      {label}
    </button>
  );
}

export default CustomBtnLink