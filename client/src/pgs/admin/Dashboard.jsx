/* eslint-disable no-unused-vars */
import { useEffect } from "react";
import { useAuth } from "../../hooks";

const Dashboard = () => {
  const { isAuth, authInfo } = useAuth();
  // console.log(authInfo);
  // useEffect(()=>{isAuth()},[])
  return <div className="">Dashboard</div>;
};

export default Dashboard;
