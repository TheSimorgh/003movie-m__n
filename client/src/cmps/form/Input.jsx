/* eslint-disable react/prop-types */




const Input = ({textarea, onChange,value,name,id,type="text",placeholder="Search Profile",className="", ...rest}) => {
  if(textarea){
    return (
      <textarea
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={className }
      {...rest}
    ></textarea>
    )
  }
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
