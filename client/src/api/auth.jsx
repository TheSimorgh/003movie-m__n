/* eslint-disable no-unused-vars */
import client from "./client";

export const register_user = async (userInfo) => {
  try {
    const { data } = await client.post("/user/register", userInfo);
  } catch (error) {
    const { response } = error;
    if (response?.data) return response.data;
    return { error: error.message || error };
  }
};

export const verify_user_email = async (userInfo) => {
  try {
    const { data } = await client.post("/user/verify-email", userInfo);
    return data;
  } catch (error) {
    const { response } = error;
    if (response?.data) return response.data;

    return { error: error.message || error };
  }
};
export const login_user = async (userInfo) => {
  try {
    const { data } = await client.post("/user/login", userInfo);
    return data;
  } catch (error) {
    const { response } = error;
    if (response?.data) return response.data;

    return { error: error.message || error };
  }
};

export const get_is_auth = async (token) => {
  try {
    const { data } = await client.get(
      "/user/me",
      {
        headers: {
          Authorization: "Bearer " + token,
          accept: "application/json",
        },
      },
      {}
    );
    return data;
  } catch (error) {
    const { response } = error;
    if (response?.data) return response.data;

    return { error: error.message || error };
  }
};
export const forgot_password = async (email) => {
  try {
    const { data } = await client.post("/user/forgot-password", { email });
    return data;
  } catch (error) {
    const { response } = error;
    if (response?.data) return response.data;

    return { error: error.message || error };
  }
};

export const verify_pass_reset_token = async (token, userId) => {
  try {
    const { data } = await client.post("/user/verify-pass-reset-token", {
      token,
      userId,
    });
    return data;
  } catch (error) {
    const { response } = error;
    if (response?.data) return response.data;

    return { error: error.message || error };
  }
};
export const reset_password = async (passwordInfo) => {
  try {
    const { data } = await client.post("/user/reset-password", passwordInfo);
    return data;
  } catch (error) {
    const { response } = error;
    if (response?.data) return response.data;

    return { error: error.message || error };
  }
};
export const resend_email_verification_token = async (userId) => {
  try {
    const { data } = await client.post(
      "/user/resend-email-verification-token",
      { userId }
    );
    return data;
  } catch (error) {
    const { response } = error;
    if (response?.data) return response.data;

    return { error: error.message || error };
  }
};

export const xxx = async (userInfo) => {
  try {
    console.log(1);
  } catch (error) {
    const { response } = error;
    if (response?.data) return response.data;

    return { error: error.message || error };
  }
};
