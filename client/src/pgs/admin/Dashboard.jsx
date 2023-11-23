/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { useAuth, useNotification } from "../../hooks";
import { AppInfoBox, LatestUploads, MostRatedMovies } from "../../cmps";
import { get_app_info, get_most_rated_movies } from "../../api/admin";

const Dashboard = () => {
  const [appInfo,setAppInfo]=useState({
    movieCount:0,
    reviewCount:0,
    userCount:0
  })
  const { isAuth, authInfo } = useAuth();
  const {updateNotification}=useNotification()
  // get_most_rated_movies  get_app_info 

  const fetchAppInfo=async()=>{
    const {error,appInfo}=await get_app_info()

    if (error) return updateNotification("error", error);
    setAppInfo({...appInfo})
  }


  useEffect(()=>{
    fetchAppInfo()
  },[])

  // console.log(authInfo);
  // useEffect(()=>{isAuth()},[])
  return (
    <div className="grid grid-cols-3 gap-5 p-5">
      <AppInfoBox
        title="Total Uploads"
        subTitle={appInfo.movieCount.toLocaleString()}
      />
      <AppInfoBox
        title="Total Reviews"
        subTitle={appInfo.reviewCount.toLocaleString()}
      />
      <AppInfoBox
        title="Total Users"
        subTitle={appInfo.userCount.toLocaleString()}
      />

      <LatestUploads />
      <MostRatedMovies />
      
    </div>
  );
};

export default Dashboard;
