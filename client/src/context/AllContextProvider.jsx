/* eslint-disable react/prop-types */
/* eslint-disable no-unreachable */
import ThemeProvider from "./ThemeProvider";

const AllContextProvider = ({ children }) => {
  return  (
    <ThemeProvider>{children}</ThemeProvider>
  
  )

    
}

export default AllContextProvider;
