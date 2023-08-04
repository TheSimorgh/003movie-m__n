/* eslint-disable react/prop-types */
/* eslint-disable no-unreachable */
import AuthProvider from "./AuthProvider";
import NotificationProvider from "./NotificationProvider";
import ThemeProvider from "./ThemeProvider";

const AllContextProvider = ({ children }) => {
  return  (
    <NotificationProvider>
      <AuthProvider>
      <ThemeProvider>{children}</ThemeProvider>

      </AuthProvider>

    </NotificationProvider>
  
  )

    
}

export default AllContextProvider;
