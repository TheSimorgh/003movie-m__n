/* eslint-disable no-unused-vars */
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Header from "../admin/Header";
import NavbarAdm from "../admin/NavbarAdm";

const MainLayoutAdmin = () => {
  return (
    <>
      <div className="flex dark:bg-primary bg-white ">
        <NavbarAdm />
        <div className="flex-1 max-w-screen-xl">
          <Header />
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default MainLayoutAdmin;
