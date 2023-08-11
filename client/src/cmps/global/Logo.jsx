import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <>
      <Link
        to="/"
        className=" text-red-600 font-extrabold hover:scale-150 transition-all"
      >
        sem
        <span className="text-white font-extrabold hover:scale-150">urg</span>
      </Link>
    </>
  );
};

export default Logo;
