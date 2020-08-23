import axios from "axios";
import {
  USER_LOADING,
  USER_LOADED,
  STUDENT_REGISTER_SUCCESS,
  TEACHER_REGISTER_SUCCESS,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  LOGOUT_FAIL,
  LOGIN_FAIL,
  AUTH_ERROR,
  STUDENT_REGISTER_FAIL,
  TEACHER_REGISTER_FAIL,
  EDIT_PROFILE,
} from "./types";
import { returnErrors } from "./error";
import { createMessage } from "./error";

export const tokenConfig = (getState) => {
  const token = getState().auth.token;

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  //   if token add to headers
  if (token) {
    config.headers["Authorization"] = `Token ${token}`;
  }
  return config;
};

export const loadUser = () => (dispatch, getState) => {
  dispatch({
    type: USER_LOADING,
  });
  axios
    .get("/api/auth/user", tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: USER_LOADED,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: AUTH_ERROR,
      });
    });
};

export const studentRegister = ({ username, password }) => (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({ username, password });

  axios
    .post("api/auth/student/register", body, config)
    .then((res) => {
      dispatch({
        type: STUDENT_REGISTER_SUCCESS,
        payload: res.data,
      });
      dispatch(
        createMessage({
          studentRegister: "Student Account created successfully",
        })
      );
    })
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: STUDENT_REGISTER_FAIL,
      });
    });
};

export const teacherRegister = ({ username, password, subject }) => (
  dispatch
) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({ username, password, subject });

  axios
    .post("api/auth/teacher/register", body, config)
    .then((res) => {
      dispatch({
        type: TEACHER_REGISTER_SUCCESS,
        payload: res.data,
      });
      dispatch(
        createMessage({
          teacherRegister: "Student Account created successfully",
        })
      );
    })
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: TEACHER_REGISTER_FAIL,
      });
    });
};

export const loginUser = ({ username, password }) => (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({ username, password });
  axios
    .post("api/auth/login", body, config)
    .then((res) => {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: LOGIN_FAIL,
      });
    });
};

export const logout = () => (dispatch, getState) => {
  axios
    .post("/api/auth/logout/", null, tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: LOGOUT_SUCCESS,
      });
    })
    .catch((err) => console.log(err));
};

export const editProfile = (profile) => (dispatch, getState) => {
  axios
    .patch("/api/auth/profile", profile, tokenConfig(getState))
    .then((res) => {
      dispatch(
        createMessage({
          editProfile: "Profile Edited",
        })
      );
      dispatch({
        type: EDIT_PROFILE,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
    });
};
