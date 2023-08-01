import { useContext } from "react";
import { ThemeContent } from "../context/ThemeProvider";
import { NotificationContext } from "../context/NotificationProvider";

export const useTheme =()=>useContext(ThemeContent)
export const useNotification=()=>useContext(NotificationContext)