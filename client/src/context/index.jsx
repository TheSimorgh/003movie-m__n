/* eslint-disable react/prop-types */
/* eslint-disable no-unreachable */
import AuthProvider from "./AuthProvider";
import MoviesProvider from "./MoviesProvider";
import NotificationProvider from "./NotificationProvider";
import SearchProvider from "./SearchProvider";
import ThemeProvider from "./ThemeProvider";

const AllContextProvider = ({ children }) => {
  return (
    <NotificationProvider>
      <SearchProvider>
        <MoviesProvider>
          <AuthProvider>
            <ThemeProvider>{children}</ThemeProvider>
          </AuthProvider>
        </MoviesProvider>
      </SearchProvider>
    </NotificationProvider>
  );
};

export default AllContextProvider;
