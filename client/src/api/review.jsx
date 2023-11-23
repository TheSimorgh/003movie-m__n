import { catchError, getToken } from "../utils/helper";
import client from "./client";



export const add_review = async (movieId,reviewData) => {
    const token = getToken();
    try {
      const {data}=await client.post(`/review/add/${movieId}`,reviewData,{
        headers:{
            authorization: "Bearer " + token,
        }
      })
      return data
    } catch (error) {
      console.log(error);
      return catchError(error);
    }
  };
  
  export const get_review_by_movie = async (movieId) => {
    try {
        const { data } = await client(`/review/get-reviews-by-movie/${movieId}`);
        return data;
    } catch (error) {
      console.log(error);
      return catchError(error);
    }
  };
  
  export const delete_review = async (reviewId) => {
    const token = getToken();
    try {
        const { data } = await client.delete(`/review/${reviewId}`, {
            headers: {
              authorization: "Bearer " + token,
            },
          });
          return data;
    } catch (error) {
      console.log(error);
      return catchError(error);
    }
  };
  
  export const update_review = async (reviewId,reviewData) => {
    const token = getToken();
    try {
        const { data } = await client.patch(`/review/${reviewId}`, reviewData, {
            headers: {
              authorization: "Bearer " + token,
            },
          });
          return data;
    } catch (error) {
      console.log(error);
      return catchError(error);
    }
  };
  


export const xx = async () => {
    try {
      1;
    } catch (error) {
      console.log(error);
      return catchError(error);
    }
  };
  