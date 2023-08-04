/* eslint-disable no-unused-vars */
import { useAuth } from "../hooks";

const Home = () => {
   const { isAuth, authInfo } = useAuth();
   console.log(authInfo);
  return (
    <div className="dark:bg-primary bg-white min-h-screen">
      Home
    </div>
  )
}

export default Home