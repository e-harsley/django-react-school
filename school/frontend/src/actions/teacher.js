import axios from "axios";
import { createMessage, returnErrors } from "./error";
import { tokenConfig } from "./auth";
import { GET_SUBJECT, GET_TEACHER, SINGLE_TEACHER } from "./types";

export const getSubjects = () => (dispatch, getState) => {
  axios
    .get("/api/teachers/", tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: GET_SUBJECT,
        payload: res.data,
      });
    })
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const getTeachers = (id) => (dispatch, getState) => {
  axios
    .get(`/api/teachers/${id}/teacher/`, tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: GET_TEACHER,
        payload: res.data,
      });
    })
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const getTeacher = (id, teacher_id) => (dispatch, getState) => {
  axios
    .get(`/api/teachers/${id}/teacher/${teacher_id}/`, tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: SINGLE_TEACHER,
        payload: res.data,
      });
    })
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};
