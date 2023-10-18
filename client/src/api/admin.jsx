import { catchError, getToken } from "../utils/helper";
import client from "./client";

export const get_app_info = async () => {
  try {
    const token = getToken();

    const { data } = await client("/admin/app-info", {
      headers: {
        authorization: "Bearer " + token,
      },
    });
    return data;
  } catch (error) {
    catchError(error);
  }
};


export const get_most_rated_movies = async () => {
    try {
      const token = getToken();
  
      const { data } = await client("/admin/most-rated", {
        headers: {
          authorization: "Bearer " + token,
        },
      });
      return data;
    } catch (error) {
      catchError(error);
    }
  };
  

