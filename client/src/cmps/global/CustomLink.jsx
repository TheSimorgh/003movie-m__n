/* eslint-disable react/prop-types */

import { Link } from "react-router-dom";

const CustomLink=({ to, children ,className="" })=> {
  return (
    <Link
      className={`"dark:text-dark-subtle text-light-subtle dark:hover:text-white hover:text-primary transition ${className}`}
      to={to}
    >
      {children}
    </Link>
  );
}

export default CustomLink