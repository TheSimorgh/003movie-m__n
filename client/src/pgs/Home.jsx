/* eslint-disable no-unused-vars */
import { Container, HeroSlideshow, NotVerified, TopRatedMovies, TopRatedTVSeries, TopRatedWebSeries } from "../cmps";
import { useAuth } from "../hooks";

const Home = () => {
  // const { isAuth, authInfo } = useAuth();
  // console.log(authInfo);
  return (
    <div className="dark:bg-primary pt-[100px] bg-white min-h-screen">
      <Container className="px-2 xl:p-0">
        <NotVerified />
      <HeroSlideshow />
        <div className="space-y-3 py-8">

          
           <TopRatedMovies /> 
          <TopRatedTVSeries />
          <TopRatedWebSeries />

        </div>
      </Container>
    </div>
    // <p className="pt-40">12323</p>
  );
};

export default Home;
