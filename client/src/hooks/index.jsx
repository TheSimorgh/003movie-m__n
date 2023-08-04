import { useContext } from "react";
import { ThemeContent } from "../context/ThemeProvider";
import { NotificationContext } from "../context/NotificationProvider";
import  {AuthContext} from "../context/AuthProvider";

export const useTheme =()=>useContext(ThemeContent)
export const useNotification=()=>useContext(NotificationContext)
export const useAuth=()=>useContext(AuthContext)