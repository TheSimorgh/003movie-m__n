/* eslint-disable no-unused-vars */
import { Link } from "react-router-dom";
import Container from "./Container";
import { BsFillSunFill } from "react-icons/bs";
import { useState } from "react";
import NavSearchForm from "../form/NavSearchForm";
import { useTheme } from "../../hooks/useTheme";
const Navbar = () => {

const [isLoggedIn,setIsLoggedIn]=useState(false)
const {toggleTheme}=useTheme()
 const handleLogout=()=>{
  setIsLoggedIn(prev=>!prev)
 }
 const handleSearchSubmit = () => {
  
};
  return (
    <div className="bg-secondary shadow-sm shadow-gray-500 fixed w-full">
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
                onClick={()=>toggleTheme()}
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
