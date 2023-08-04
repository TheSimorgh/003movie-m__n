/* eslint-disable no-unused-vars */
import { Container, NotVerified } from "../cmps";
import { useAuth } from "../hooks";

const Home = () => {
   const { isAuth, authInfo } = useAuth();
   console.log(authInfo);
  return (
    <div className="dark:bg-primary pt-[100px] bg-white min-h-screen">
       <Container className="px-2 xl:p-0">
      <NotVerified />
      
       </Container>
    </div>
  )
}

export default Home