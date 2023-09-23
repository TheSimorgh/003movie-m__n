/* eslint-disable react/prop-types */

const ViewAll_Btn = ({type="button",children, className="",visible,onClick}) => {
    if(!visible) return null;
  return (
    <button 
    onClick={onClick} type={type} className={className + "dark:text-white text-primary hover:underline transition"}>
        {children}
    </button>
  )
}

export default ViewAll_Btn