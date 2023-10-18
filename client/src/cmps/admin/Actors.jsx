
import { useEffect, useState } from "react";
import { BsPencilSquare, BsTrash } from "react-icons/bs";
import { Btn, NextAndPrevBtn } from "..";
import { useNotification, useSearch } from "../../hooks";
import { get_actors } from "../../api/actor";

// const results = [
//   {
//     name: "222",
//     about: "222",
//     avatar:
//       "https://www.simplilearn.com/ice9/free_resources_article_thumb/what_is_image_Processing.jpg",
//   },
//   {
//     name: "222",
//     about: "222",
//     avatar:
//       "https://www.simplilearn.com/ice9/free_resources_article_thumb/what_is_image_Processing.jpg",
//   },
//   {
//     name: "222",
//     about: "222",
//     avatar:
//       "https://www.simplilearn.com/ice9/free_resources_article_thumb/what_is_image_Processing.jpg",
//   },
//   {
//     name: "222",
//     about: "222",
//     avatar:
//       "https://www.simplilearn.com/ice9/free_resources_article_thumb/what_is_image_Processing.jpg",
//   },
// ];
let currentPageNo = 0;
const limit = 20;
const Actors = () => {
  const [actors, setActors] = useState([]);
  const [results, setResults] = useState([]);
  const [reachedToEnd, setReachedToEnd] = useState(false);

  const { handleSearch, resetSearch, resultNotFound } = useSearch();
  const { updateNotification } = useNotification();

  const handleOnEditClick = (profile) => {
    console.log(profile);
  };
  const handleOnDeleteClick = (profile) => {
    console.log(profile);
  };

  const get_all_actors = async (pageNo) => {
    const { profiles, error } = await get_actors(pageNo, limit);
    if (error) return updateNotification("error", error);
    if (!profiles.length) {
      currentPageNo = pageNo - 1;
      return setReachedToEnd(true);
    }
    setActors([...profiles]);
  };

  const handleOnNextClick=()=>{
    if(reachedToEnd) return;
    currentPageNo +=1;
    get_all_actors(currentPageNo)
  }
  const handleOnPrevClick=()=>{
    if(currentPageNo<=0) return;
    if(reachedToEnd) setReachedToEnd(false)

    currentPageNo -=1;
    get_all_actors(currentPageNo)

  }
  useEffect(() => {
    get_all_actors(currentPageNo);
  }, []);
  return (
    <>
      <div className="p-5">
        <div className="grid grid-cols-4 gap-5">
          {actors.map((e, i) => (
            <ActorProfile profile={e} key={i} />
          ))}
        </div>
      </div>
      <NextAndPrevBtn className="mt-5" reachLimit={reachedToEnd}    onNextClick={handleOnNextClick}   onPrevClick={handleOnPrevClick}/>
    </>
  );
};

export default Actors;

const ActorProfile = ({ profile }) => {
  const [showOptions, setShowOptions] = useState(false);
  const { name, about = "", avatar } = profile;
  const acceptedNameLength = 15;

  const handleOnMouseEnter = () => {
    setShowOptions(true);
  };

  const handleOnMouseLeave = () => {
    setShowOptions(false);
  };

  const getName = (name) => {
    if (name.length <= acceptedNameLength) return name;
    return name.subsring(0, acceptedNameLength) + "..";
  };

  if (!profile) return null;

  return (
    <div className="bg-white shadow dark:shadow dark:bg-secondary rounded h-20 overflow-hidden">
      <div
        onMouseOver={handleOnMouseEnter}
        onMouseOut={handleOnMouseLeave}
        className="flex cursor-pointer relative"
      >
        <img
          src={avatar}
          alt={name}
          className="w-20 aspect-square object-cover"
        />
        <div className="px-2">
          <h1 className="text-xl text-primary dark:text-white font-semibold whitespace-nowrap">
            {getName(name)}
          </h1>
          <p className="text-primary dark:text-white opacity-70">
            {about.substring(0, 50)}
          </p>
        </div>
        <Options
          onEditClick={onEditClick}
          onDeleteClick={onDeleteClick}
          visible={showOptions}
        />
      </div>
    </div>
  );
};

const Options = (visible, onDeleteClick, onEditClick) => {
  if (!visible) return null;
  return (
    <div className="absolute inset-0 bg-primary bg-opacity-25 backdrop-blur-sm flex justify-center items-center space-x-5">
      <Btn
        onClick={onDeleteClick}
        className="p-2 rounded-full bg-white text-primary hover:opacity-80 transition"
        type="button"
      >
        <BsTrash />
      </Btn>

      <Btn
        onClick={onEditClick}
        className="p-2 rounded-full bg-white text-primary hover:opacity-80 transition"
        type="button"
      >
        <BsPencilSquare />
      </Btn>
    </div>
  );
};
