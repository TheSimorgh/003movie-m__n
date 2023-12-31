import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { get_single_pub_movie } from "../api/movie";
import { useAuth, useNotification } from "../hooks";
import { AddRatingModal, Container, CustomBtnLink, ProfileModal, RatingStar, RelatedMovies } from "../cmps";
import { convertDate, convertReviewCount } from "../utils/helper";



const SingleMovie = () => {
  const { ready, setReady } = useState(false);
  const [movie, setMovie] = useState({});
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState({});

  const { movieId } = useParams();
  const { updateNotification } = useNotification();
  const { authInfo } = useAuth();
  const { isLoggedIn } = authInfo;
  const navigate = useNavigate();

  const fetch_movie = async () => {
    const { error, movie } = await get_single_pub_movie(movieId);
    if (error) return updateNotification("error", error);

    // setReady(true);

    setMovie(movie);
  };
  console.log(movie);
  const handleOnRateMovie = () => {
    if (!isLoggedIn) return navigate("/auth/signin");
    setShowRatingModal(true);
  };
  const handleOnRatingSuccess=(reviews)=>{
    setMovie({...movie,reviews:{...reviews}})
  }
  useEffect(() => {
    if (movieId) fetch_movie();
  }, [movieId]);

  // if (!ready)
  // return (
  //   <div className="h-screen flex justify-center items-center dark:bg-primary bg-white">
  //     <p className="text-light-subtle dark:text-dark-subtle animate-pulse">
  //       Please wait
  //     </p>
  //   </div>
  // );
  // console.log("ready");

  // console.log(ready);

  const {
    id,
    trailer,
    poster,
    title,
    storyLine,
    language,
    releseDate,
    type,
    director = {},
    reviews = {},
    writers = [],
    cast = [],
    genres = [],
    tags=[],
  } = movie;
  
  const handleProfileClick=(profile)=>{
    setSelectedProfile(profile);
    setShowProfileModal(true);
  }

  const hideRatingModal=()=>setShowRatingModal(false)
  const displayRatingModal=()=>setShowRatingModal(true)


  const hideProfileModal=()=>setShowProfileModal(false)
  const displayProfileModal=()=>setShowProfileModal(true)


  return (
    <div className="dark:bg-primary bg-white min-h-screen pb-10">
      <Container className="xl:px-0 px-2">
        <video poster={poster} controls src={trailer}></video>
        <div className="flex justify-between">
          <h1 className="xl:text-4xl lg:text-3xl text-2xl  text-highlight dark:text-highlight-dark font-semibold py-3">
            {title}
          </h1>
          <div className="flex flex-col items-end">
            <RatingStar rating={reviews.ratingAvg} />
            <CustomBtnLink
              label={convertReviewCount(reviews.reviewCount) + " Reviews"}
              onClick={() => navigate("/movie/reviews/" + id)}
            />
            <CustomBtnLink
              label="Rate the movie"
              onClick={handleOnRateMovie}
            />
          </div>
        </div>

        <div className="space-y-3">
          <p className="text-light-subtle dark:text-dark-subtle">{storyLine}</p>
          <ListWithLabel label="Director:">
            <CustomBtnLink
              onClick={() => handleProfileClick(director)}
              label={director.name}
            />
          </ListWithLabel>

          <ListWithLabel label="Writers:">
            {writers.map((w) => (
              <CustomBtnLink
                onClick={() => handleProfileClick(w)}
                key={w.id}
                label={w.name}
              />
            ))}
          </ListWithLabel>

          <ListWithLabel label="Tags:">
            {tags.map((w) => (
              <CustomBtnLink
                // onClick={() => handleProfileClick(w)}
                key={w}
                label={w}
              />
            ))}
          </ListWithLabel>
          <ListWithLabel label="Cast:">
            {cast.map(({ id, profile, leadActor }) => {
              return leadActor ? (
                <CustomBtnLink
                  onClick={() => handleProfileClick(profile)}
                  label={profile.name}
                  key={id}
                />
              ) : null;
            })}
          </ListWithLabel>


          <ListWithLabel label="Language:">
            <CustomBtnLink label={language} clickable={false} />
          </ListWithLabel>

          <ListWithLabel label="Release Date:">
            <CustomBtnLink
              label={convertDate(releseDate)}
              clickable={false}
            />
          </ListWithLabel>

          <ListWithLabel label="Cast:">
            {genres.map((g) => (
              <CustomBtnLink label={g} key={g} clickable={false} />
            ))}
          </ListWithLabel>

          <ListWithLabel label="Type:">
            <CustomBtnLink label={type} clickable={false} />
          </ListWithLabel>

          <CastProfiles cast={cast} />
          <RelatedMovies movieId={movieId} />
        </div>
      </Container>

      <ProfileModal
        visible={showProfileModal}
        onClose={hideProfileModal}
        profileId={selectedProfile.id}
      />

      <AddRatingModal
        visible={showRatingModal}
        onClose={hideRatingModal}
        onSuccess={handleOnRatingSuccess}
      />
    </div>
  );
}

export default SingleMovie;

const ListWithLabel = ({ children, label }) => {
  return (
    <div className="flex space-x-2">
      <p className="text-light-subtle dark:text-dark-subtle font-semibold">
        {label}
      </p>
      {children}
    </div>
  );
};


const CastProfiles = ({ cast, onProfileClick }) => {
  return (
    <div className="">
      <h1 className="text-light-subtle dark:text-dark-subtle font-semibold text-2xl mb-2">
        Cast:
      </h1>
      <div className="flex flex-wrap space-x-4">
        {cast.map(({ id, profile, roleAs }) => {
          return (
            <div
              key={id}
              className="basis-28 flex flex-col items-center text-center mb-4"
            >
              <img
                className="w-24 h-24 aspect-square object-cover rounded-full"
                src={profile.avatar}
                alt=""
              />

              <CustomBtnLink label={profile.name} />
              <span className="text-light-subtle dark:text-dark-subtle text-sm">
                as
              </span>
              <p className="text-light-subtle dark:text-dark-subtle">
                {roleAs}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
