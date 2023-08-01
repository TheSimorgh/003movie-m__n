/* eslint-disable react/prop-types */
/* eslint-disable no-unreachable */
import NotificationProvider from "./NotificationProvider";
import ThemeProvider from "./ThemeProvider";

const AllContextProvider = ({ children }) => {
  return  (
    <NotificationProvider>
          <ThemeProvider>{children}</ThemeProvider>
    </NotificationProvider>
  
  )

    
}

export default AllContextProvider;
