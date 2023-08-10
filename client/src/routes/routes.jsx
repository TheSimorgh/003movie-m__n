/* eslint-disable no-unused-vars */
import { Actors, ConfirmPassword, Dashboard, EmailVerification, ForgotPassword, Home, MovieReviews, Movies, NotFound, SearchMovies, SearchMoviesAdm, SignIn, SignUp, SingleMovie } from "../pgs";

const routes = [
  {
    //    // path: "/",
    index: true,
    element: <Home />,
    state: "home",

  },
    {
    path: "/auth/signin",
    element: <SignIn />,
    state:"sigin"
  },
    {
    path: "/auth/signup",
    element: <SignUp />,
    state:"signup"
  },
    {
    path: "/auth/verification",
    element: <EmailVerification />,
    state:"verification"
  },
    {
    path: "/auth/forgot-password",
    element: <ForgotPassword />,
    state:"forgot password"
  },

    {
    path: "/auth/reset-password",
    element: <ConfirmPassword />,
    state:"login"
  },
    {
    path: "/movie/:movieId",
    element: <SingleMovie />,
    state:"single movie"
  },
    {
    path: "/movie/reviews/:movieId",
    element: <MovieReviews />,
    state:"movie reviews"
  },
    {
    path: "/movie/search",
    element: <SearchMovies />,
    state:"movie search"
  },
  {
    path: "*",
    element: <NotFound />,
    state:"404 Page Not Found"
  },
];

export default routes;

export const admin_routes = [
  {
    //    // path: "/",
    index: true,
    element: <Dashboard />,
    state: "dashboard",

  },
    {
    path: "/movies",
    element: <Movies />,
    state:"movies"
  },
    {
    path: "/actors",
    element: <Actors />,
    state:"actors"
  },
    {
    path: "/search",
    element: <SearchMoviesAdm />,
    state:"search"
  },
    {
    path: "*",
    element: <NotFound />,
    state:"not found"
  },

   
];








// const routes = [
//   {
//     // path: "/",
//     index: true,
//     element: <Home />,
//     state:"home"
//   },
//   {
//     path: "/login",
//     element: <Login />,
//     state:"login"
//   },
//   {
//     path: "/register",
//     element: <Register />,
//     state:"register"
//   },
//   {
//     path: "/user-public-profile/:userId",
//     element:  <ProtectedPage> <PublicUserProf /> </ProtectedPage>,
//     state:"user-public-profile"
//   },
//   {
//     path: "/post/schedule/:postId",
//     element:  <ProtectedPage><SchedulePost /> </ProtectedPage>,
//     state:"post/schedule/"
//   },
//   {
//     path: "/post/:postId",
//     element: <ProtectedPage><PostDetails /></ProtectedPage>,
//     state:"post"
//   },
//   {
//     path: "/update-profile",
//     element: <ProtectedPage> <UpdateUser /></ProtectedPage>,
//     state:"update-profile"
//   },
//   {
//     path: "/forgot-password",
//     element: <PasswordResetReq />,
//     state:"forgot-password"
//   },
//   {
//     path: "/reset-password/:token",
//     element: <PasswordReset />,
//     state:"reset-password"
//   },
//   {
//     path: "*",
//     element: <NotFound />,
//     state:"NotFound"
//   },
//   {
//     path: "/user-profile",
//     element: <ProtectedPage> <PrivateUserProf /> </ProtectedPage>,
//     state:"user-profile"

//   },
//   {
//     path: "/add-post",
//     element: <ProtectedPage><AddPost /> </ProtectedPage>,
//     state:"add-post"

//   },
//   {
//     path: "/verify-account/:token",
//     element: <ProtectedPage> <AccountVerification /> </ProtectedPage>,
//     state:"verify-account"

//   },
//   {
//     path: "/upload-profile-image",
//     element: <ProtectedPage> <UploadProfImg /></ProtectedPage>,
//     state:"upload-profile-image"

//   },
//   {
//     path: "/upload-cover-image",
//     element: <ProtectedPage><UploadCoverImg /></ProtectedPage>,
//     state:"upload-cover-image"
//   },
//   {
//     path: "/posts",
//     element: <ProtectedPage><PostLists /> </ProtectedPage>,
//     state:"post"

//   },
//   {
//     path: "/post/:postId/update",
//     element:<ProtectedPage><UpdatePost /></ProtectedPage>,
//     state:"post/:postId/update"

//   },
// ];
