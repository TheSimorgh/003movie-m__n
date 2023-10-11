/* eslint-disable react/prop-types */
/* eslint-disable no-unreachable */
import AuthProvider from "./AuthProvider";
import NotificationProvider from "./NotificationProvider";
import SearchProvider from "./SearchProvider";
import ThemeProvider from "./ThemeProvider";

const AllContextProvider = ({ children }) => {
  return (
    <NotificationProvider>
      <SearchProvider>
        <AuthProvider>
          <ThemeProvider>{children}</ThemeProvider>
        </AuthProvider>
      </SearchProvider>
    </NotificationProvider>
  );
};

export default AllContextProvider;
