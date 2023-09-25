import { useEffect, useState } from "react";
import genres from "../../utils/genres";
// import Btn from "../global/Btn";
import ModalContainer from "../global/ModalContainer";
import Btn from "../global/Btn";
import Submit_Btn from "../form/Submit_Btn";

const GenresModal = ({ visible, previousSelection, onClose, onSubmit }) => {
  // if (!visible) return null;
  const [selectedGenres, setSelectedGenres] = useState([]);
  const handleClose = () => {
    setSelectedGenres(previousSelection);
    onClose();
  };

  const handleSubmit = () => {
    onSubmit(selectedGenres);
    onClose();
  };

  const handleGenresSelector = (gen) => {
    let newGenres = [];
    if (selectedGenres.includes(gen)) {
      newGenres = selectedGenres.filter((genre) => genre !== gen);
    } else {
      newGenres = [...selectedGenres, gen];
    }
    setSelectedGenres([...newGenres]);
  };
  useEffect(() => {
    setSelectedGenres(previousSelection);
  }, []);
  useEffect(() => {}, [previousSelection, selectedGenres]);
  return (
    <ModalContainer visible={visible} onClose={handleClose}>
      <div className="flex flex-col justify-between h-full relative">
        <button
          className="absolute text-primary dark:text-white right-0 text-center rounded-full border-2 w-7 h-7  "
          onClick={() => onClose()}
        >
          &#10005;
        </button>
        <div>
          {/* <Btn onClick={onClose} className="dark:text-white text-primary text-2xl font-semibold text-center">x </И> */}
          <h1 className="dark:text-white text-primary text-2xl font-semibold text-center">
            Select Genres
          </h1>

          <div className="space-y-3">
            {genres.map((gen, index) => (
              <Genre
                onClick={() => handleGenresSelector(gen)}
                selected={selectedGenres.includes(gen)}
                key={index + gen}
              >
                {gen}
              </Genre>
            ))}
          </div>
        </div>
        <div>
          {/* {selectedGenres.map((e) => (
                  <p key={e} className=" dark:text-white text-black p-2 border-2">
                  {e}
                </p>
        )
    
        )} */}
        </div>
        <div>
          <Submit_Btn value="Submit" onClick={handleSubmit} />
        </div>
      </div>
    </ModalContainer>
  );
};

export default GenresModal;

const Genre = ({ children, selected, onClick }) => {
  const getSeletedStyle = () => {
    return selected
      ? "dark:bg-white dark:text-primary bg-light-subtle text-white"
      : "text-primary dark:text-white";
  };

  return (
    <Btn
      onClick={onClick}
      className={
        getSeletedStyle() +
        " border-2 dark:border-dark-subtle border-light-subtle p-1 rounded mr-3"
      }
    >
      {children}
    </Btn>
  );
};
