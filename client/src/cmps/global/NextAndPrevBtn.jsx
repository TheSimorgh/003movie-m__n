/* eslint-disable react/prop-types */
import Btn from "./Btn";

const NextAndPrevBtn = ({
  className = "",
  onNextClick,
  onPrevClick,
  reachLimit,
}) => {
  const getClasses = () => {
    return "flex justify-end items-center space-x-3 ";
  };

  return (
    <div className={className + getClasses()}>
      <Btn
        onClick={onPrevClick}
        type="button"
        className="text-primary dark:text-white hover:underline"
        value="Prev"
      />
      {!reachLimit ? (
        <Btn
          onClick={onNextClick}
          type="button"
          className="text-primary dark:text-white hover:underline"
          value="Next"
        />
      ) : null}
    </div>
  );
};

export default NextAndPrevBtn;
