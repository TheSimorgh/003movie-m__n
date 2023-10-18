/* eslint-disable no-unused-vars */
import { useEffect } from "react";
import { useAuth } from "../../hooks";
import { AppInfoBox, LatestUploads } from "../../cmps";

const Dashboard = () => {
  const { isAuth, authInfo } = useAuth();
  // console.log(authInfo);
  // useEffect(()=>{isAuth()},[])
  return (
    <div className="grid grid-cols-3 gap-5 p-5">
      <AppInfoBox
        title="Total Uploads"
        // subTitle={appInfo.movieCount.toLocaleString()}
        subTitle={"3333"}
      />
            <AppInfoBox
        title="Total Uploads"
        // subTitle={appInfo.movieCount.toLocaleString()}
        subTitle={"3333"}
      />
            <AppInfoBox
        title="Total Uploads"
        // subTitle={appInfo.movieCount.toLocaleString()}
        subTitle={"3333"}
      />
      <LatestUploads />
      
    </div>
  );
};

export default Dashboard;
