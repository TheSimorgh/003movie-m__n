/* eslint-disable no-unused-vars */
import { useEffect } from "react";
import { useAuth } from "../../hooks";


const Dashboard = () => {
  const { isAuth, authInfo } = useAuth();
  // console.log(authInfo);
  // useEffect(()=>{isAuth()},[])
  return (
    <div className="pt-[60px] px-5 grid grid-cols-3 gap-5 p-5">
Dashboard
      </div>
  )
}

export default Dashboard
