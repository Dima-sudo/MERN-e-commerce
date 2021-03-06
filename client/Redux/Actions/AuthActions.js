import axios from "axios";
import alertConfig from "./AlertActions";
import toggleFetching from "./toggleFetching";

import { message } from "antd";

export const login = (loginForm) => {
  return async (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      method: "POST",
    };

    const res = await axios.post(
      `${process.env.SERVER_URL}/auth/login`,
      loginForm,
      config
    );

    if (res.data.status === "failure") {
      message.error(`${res.data.message}`, 4);
      dispatch(toggleFetching());
    } else if (res.data.status === "success") {
      const action = {
        type: "LOGIN",
        payload: res.data,
      };

      dispatch(action);

      const alert = {
        message: "You have successfully logged in",
        type: "success",
      };

      dispatch(alertConfig(alert));
    }
  };
};

export const logout = () => {
  return async (dispatch, getState) => {
    const token = getState().isLoggedIn.token;

    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    };

    await axios.get(`${process.env.SERVER_URL}/auth/logout`, options);

    const action = {
      type: "LOGOUT",
    };

    message.success("Successfully logged you out", 4);

    dispatch(action);
  };
};

export const switchPassword = (form) => {
  return async (dispatch, getState) => {
    const token = getState().isLoggedIn.token;

    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    };

    const res = await axios.patch(
      `${process.env.SERVER_URL}/auth/changePassword`,
      form,
      options
    );

    if (res.data.status === "failure") {
      const alert = {
        message:
          "There was an error changing your password, try again in a bit",
        type: "error",
      };

      dispatch(alertConfig(alert));
    } else if (res.data.status === "success") {
      const alert = {
        message: "Your password was changed successfully",
        type: "success",
      };

      dispatch(alertConfig(alert));
      dispatch(logout());
    }
  };
};
