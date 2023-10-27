/* eslint-disable no-unused-vars */
import client from "./client";
import { getToken, catchError } from "../utils/helper";

export const upload_trailer = async (formData, onUploadProgress) => {
  const token = getToken();
  try {
    const { data } = await client.post("/movie/upload-trailer", formData, {
      headers: {
        authorization: "Bearer " + token,
        "content-type": "multipart/form-data",
      },
      onUploadProgress: ({ loaded, total }) => {
        if (onUploadProgress)
          onUploadProgress(Math.floor((loaded / total) * 100));
      },
    });
    return data;
  } catch (error) {
    return catchError(error);
  }
};

export const upload_movie = async (formData) => {
  const token = getToken();
  try {
    const { data } = await client.post("/movie/create", formData, {
      headers: {
        authorization: "Bearer " + token,
        "content-type": "multipart/form-data",
      },
    });
    return data;
  } catch (error) {
    return catchError(error);
  }
};

export const update_movie = async (id, formData) => {
  const token = getToken();
  try {
    const { data } = await client.patch(`/movie/update/${id}`, formData, {
      headers: {
        authorization: "Bearer " + token,
        "content-type": "multipart/form-data",
      },
    });
    return data
  } catch (error) {
    console.log(error);
    return catchError(error);
  }
};

export const get_movie_for_update = async (id) => {
  const token = getToken();
  try {
    const { data } = await client("/movie/for-update/" + id, {
      headers: {
        authorization: "Bearer " + token,
      },
    });

    return data;
  } catch (error) {
    return catchError(error);
  }
};
export const delete_movie = async (id) => {
  const token = getToken();
  try {
    const { data } = await client.delete(`/movie/delete/${id}`, {
      headers: {
        authorization: "Bearer " + token,
      },
    });
    return data;
  } catch (error) {
    return catchError(error);
  }
};

export const get_single_movie = async (id) => {
  try {
    const { data } = await client.get(`/movie/single/:${id}`);
    return data;
  } catch (error) {
    return catchError(error);
  }
};
export const get_movies = async (pageNo, limit) => {
  const token = getToken();
  try {
    const { data } = await client(
      `/movie/movies?pageNo=${pageNo}&limit=${limit}`, {
        headers: {
          authorization: "Bearer " + token,
        },
      }
    );

    return data;
  } catch (error) {
    return catchError(error);
  }
};
export const get_all_movies = async (pageNo, limit) => {
  try {
    const { data } = await client(`/movie/all`, {});

    return data;
  } catch (error) {
    return catchError(error);
  }
};

export const search_movie = async (query) => {
  const token = getToken();
  try {
    const { data } = await client(`/movie/search_movie?title=${query}`, {
      headers: {
        authorization: "Bearer " + token,
      },
    });
    return data;
  } catch (error) {
    return catchError(error);
  }
};
export const xx = async () => {
  try {
    1;
  } catch (error) {
    console.log(error);
  }
};
