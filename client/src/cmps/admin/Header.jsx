/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useNavigate } from "react-router-dom";
import SearchFormAdm from "../form/SearchFormAdm";
import { useTheme } from "../../hooks";
import { useEffect, useRef, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { BsFillSunFill } from "react-icons/bs";

const Header = ({ onAddActorClick, onAddMovieClick }) => {
  const [showOptions, setShowOptions] = useState(false);
  const { toggleTheme } = useTheme();

  const navigate = useNavigate();
  const handleSearchSubmit = (query) => {
    if(!query.trim()) return ;
    console.log(query);
    navigate(`/search?title=${query}`)
  };

  const options = [
    { title: "Add Movie", onClick: onAddMovieClick },
    { title: "Add Actor", onClick: onAddActorClick },
  ];

  return (
    <div className=" flex items-center justify-between relative p-5">
      <SearchFormAdm
        onSubmit={handleSearchSubmit}
        placeholder="Search Movies..."
      />
      <div className="flex items-center space-x-3">
        <button
          onClick={toggleTheme}
          className="dark:text-white text-light-subtle"
        >
          <BsFillSunFill size={24} />
        </button>

        <button
          onClick={() => setShowOptions((prev) => !prev)}
          className="flex items-center space-x-2 dark:border-dark-subtle border-light-subtle dark:text-dark-subtle text-light-subtle hover:opacity-80 transition font-semibold border-2 rounded text-lg px-3 py-1"
        >
          <span>Create</span>
          <AiOutlinePlus />
        </button>

        <CreateOptions
          visible={showOptions}
          onClose={() => setShowOptions(prev=>!prev)}
          options={options}
        />
      </div>
    </div>
  );
};

export default Header;

const CreateOptions = ({ options, visible, onClose }) => {
    const container =useRef()
    const containerID = "options-container";



  useEffect(()=>{
    const handleClose=(e)=>{console.log(e.target);
        if (!visible) return;
        const { parentElement, id } = e.target;
        console.log(e.target);

        if (parentElement.id === containerID || id === containerID) return;
  
      // Old Code (Before React 18)
    //  container.current.classList.remove("animate-scale");
    //    container.current.classList.add("animate-scale-reverse");

    if (container?.current) {
        if (!container.current.classList.contains("animate-scale"))
          container.current.classList.add("animate-scale-reverse");
      }
  }
    document.addEventListener("click",handleClose)
    return ()=>{document.removeEventListener("click",handleClose) }
  },[visible])

  const handleClick = (fn) => {
    fn();
    onClose();
  };
  if (!visible) return null;
  return (
    <div 
    id={containerID}
    ref={container}
    onAnimationEnd={(e) => {
        if (e.target.classList.contains("animate-scale-reverse")) onClose();
        e.target.classList.remove("animate-scale");
      }}
    className="absolute right-5 z-50 top-20 flex flex-col space-y-3 p-5 dark:bg-secondary bg-white drop-shadow-lg rounded animate-scale">
      {options.map((e) => (
        <Option key={e.title}
        // onClick={e.onClick}
          onClick={()=>handleClick(e.onClick)}
>
          {e.title}
        </Option>
      ))}
    </div>
  );
};

const Option = ({ children, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="dark:text-white text-secondary hover:opacity-80 transition"
    >
      {children}
    </button>
  );
};
