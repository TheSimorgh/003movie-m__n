/* eslint-disable no-unused-vars */
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

const MainLayoutAdmin = () => {
  return (
    <>
      <div className=" ">
        
        <Navbar/>
        <Outlet  />
      </div>
    </>
  );
};

export default MainLayoutAdmin;
