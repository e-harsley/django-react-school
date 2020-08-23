import axios from "axios";
import { createMessage, returnErrors } from "./error";
import { tokenConfig } from "./auth";
import {
  GET_COURSE,
  ADD_COURSE,
  GET_MODULES,
  ADD_MODULE,
  EDIT_COURSE,
  DELETE_COURSE,
  EDIT_MODULE,
  DELETE_MODULE,
} from "./types";

export const getCourses = () => (dispatch, getState) => {
  axios
    .get("/api/courses/", tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: GET_COURSE,
        payload: res.data,
      });
    })
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const addCourse = (course) => (dispatch, getState) => {
  axios
    .post("/api/courses/", course, tokenConfig(getState))
    .then((res) => {
      dispatch(
        createMessage({
          addCourse: "Course Created",
        })
      );
      dispatch({
        type: ADD_COURSE,
        payload: res.data,
      });
      console.log(res.data);
    })
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
      console.log(err);
    });
};

export const getModules = (id) => (dispatch, getState) => {
  axios
    .get(`api/courses/${id}/modules`, tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: GET_MODULES,
        payload: res.data,
      });
    })
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const addModule = (id, module) => (dispatch, getState) => {
  axios
    .post(`api/courses/${id}/module/`, module, tokenConfig(getState))
    .then((res) => {
      dispatch(
        createMessage({
          addModule: "Module Added",
        })
      );
      dispatch({
        type: ADD_MODULE,
        payload: res.data,
      });
    })
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const editCourse = (id, course) => (dispatch, getState) => {
  axios
    .patch(`/api/courses/${id}/`, course, tokenConfig(getState))
    .then((res) => {
      dispatch(
        createMessage({
          editCourse: "Course Editted",
        })
      );
      dispatch({
        type: EDIT_COURSE,
        payload: res.data,
      });
    })
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const deleteCourse = (id) => (dispatch, getState) => {
  axios
    .delete(`/api/courses/${id}/`, tokenConfig(getState))
    .then((res) => {
      console.log(res);
      dispatch(
        createMessage({
          deleteCourse: "Course Deleted",
        })
      );
      dispatch({
        type: DELETE_COURSE,
        payload: id,
      });
    })
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const editModule = (id, module_id, module) => (dispatch, getState) => {
  axios
    .patch(
      `/api/courses/${id}/module/update/${module_id}/`,
      module,
      tokenConfig(getState)
    )
    .then((res) => {
      dispatch(
        createMessage({
          editModule: "Module Editted",
        })
      );
      dispatch({
        type: EDIT_MODULE,
        payload: res.data,
      });
    })
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const deleteModule = (id, module_id) => (dispatch, getState) => {
  axios
    .delete(
      `/api/courses/${id}/module/delete/${module_id}`,
      tokenConfig(getState)
    )
    .then((res) => {
      console.log(res);
      dispatch(
        createMessage({
          deleteModule: "Module Deleted",
        })
      );
      dispatch({
        type: DELETE_MODULE,
        payload: module_id,
      });
    })
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};
