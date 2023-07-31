import { useContext } from "react";
import { ThemeContent } from "../context/ThemeProvider";

export const useTheme =()=>useContext(ThemeContent)