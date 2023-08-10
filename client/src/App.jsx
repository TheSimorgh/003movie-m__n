import MainRoute from "./routes/MainRoute";
/* eslint-disable no-unused-vars */
import { Routes, Route } from "react-router-dom";

import routes from "./routes/routes";
import { MainLayout,  } from "./cmps";
import { useAuth } from "./hooks";
import MainRouteAdmin from "./routes/MainRouteAdmin";
function App() {
  const {authInfo}=useAuth();
  const isAdmin=authInfo.profile?.role==="admin"
  console.log(isAdmin)
    console.log(authInfo);
  // if(isAdmin) return <div>  <MainLayoutAdmin/> </div>
  return (
    <>
  
    {isAdmin ? <MainRouteAdmin/> : <MainRoute />}
    {/* <MainRoute /> */}

    </>
  );
}

export default App;
