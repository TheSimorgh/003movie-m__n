/* eslint-disable no-unused-vars */
import { Routes,HashRouter, Route } from "react-router-dom";
import routes, { admin_routes } from "./routes";
import {  MainLayoutAdmin } from "../cmps";

const MainRouteAdmin = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainLayoutAdmin />}>
          {admin_routes.map((route, index) =>
            route.index ? (
              <Route index key={index} element={route.element} />
            ) : (
              <Route path={route.path} key={index} element={route.element} />
            )
          )}
        </Route>
      </Routes>
    </>
  );
};

export default MainRouteAdmin;
