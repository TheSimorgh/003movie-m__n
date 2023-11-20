/* eslint-disable no-unused-vars */
import { Link, useNavigate } from "react-router-dom";
import Container from "./Container";
import { BsFillSunFill } from "react-icons/bs";
import { useState } from "react";
import NavSearchForm from "../form/NavSearchForm";
import { 
   useAuth,
  
  useTheme } from "../../hooks";
const Navbar = () => {

const {toggleTheme}=useTheme()
const { authInfo, handleLogout } = useAuth();
const { isLoggedIn } = authInfo;
const navigate = useNavigate();
// const[isLoggedIn,setIsLoggedIn]=useState(false)
//  const handleLogout=()=>{
//   setIsLoggedIn(prev=>!prev)
//  }
 const handleSearchSubmit = () => {
  console.log(authInfo,isLoggedIn);
};
  return (
    <div className="bg-secondary shadow-sm shadow-gray-500 fixed w-full z-10">
      <Container className="p-2">
      <div className="flex justify-between items-center">
          <Link
            to="/"
            className=" text-red-600 font-extrabold hover:scale-150 transition-all"
          >
              sem
            <span className="text-white font-extrabold hover:scale-150">
              urg
            </span>
          </Link>
          <ul className="flex items-center sm:space-x-4 space-x-2">
          <li>
              <button
                onClick={toggleTheme}
                className="dark:bg-white bg-dark-subtle p-1 rounded sm:text-2xl text-lg"
              >
                <BsFillSunFill className="text-secondary" size={24} />
              </button>
            </li>
            <li>
              <NavSearchForm
                placeholder="search..."
                inputClassName="border-dark-subtle text-white focus:border-white sm:w-auto w-40 sm:text-lg"
                onSubmit={handleSearchSubmit}
              />
            </li>
            <li>
              {isLoggedIn ? (
                <button
                  onClick={handleLogout}
                  className="text-white font-semibold text-lg"
                >
                  Log out
                </button>
              ) : (
                <Link
                  className="text-white font-semibold text-lg"
                  to="/auth/signin"
                  onClick={handleLogout}
                >
                  Login
                </Link>
              )}
            </li>
          </ul>
        </div>
      </Container>
    </div>
  );
};

export default Navbar;
