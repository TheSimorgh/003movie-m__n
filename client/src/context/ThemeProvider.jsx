/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { createContext,useContext,useEffect } from "react";


export const ThemeContent=createContext();


const defaultTheme = "light";
const darkTheme = "dark";



export default function ThemeProvider({children}){
    const toggleTheme=()=>{
        const oldTheme = getTheme();
        const newTheme = oldTheme === defaultTheme ? darkTheme : defaultTheme;
    
        updateTheme(newTheme, oldTheme);
        console.log(oldTheme);
    }
    useEffect(()=>{
    
        const theme = getTheme();
        if (!theme) updateTheme(defaultTheme);
        else updateTheme(theme);
    },[])
 return (
    <ThemeContent.Provider value={{toggleTheme}}  > 
        {children}
    </ThemeContent.Provider>
 )
}

const getTheme=()=>localStorage.getItem("theme")
const updateTheme = (theme, themeToRemove) => {
    if (themeToRemove) document.documentElement.classList.remove(themeToRemove);

    document.documentElement.classList.add(theme);
    localStorage.setItem("theme", theme);
}

