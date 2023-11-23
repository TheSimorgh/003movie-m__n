/* eslint-disable react/prop-types */

 function Container({ children, className }) {
  return (
    <div className={"max-w-screen-xl mx-auto " + className}>{children}</div>
  );
}

export default Container