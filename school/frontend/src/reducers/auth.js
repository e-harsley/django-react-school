import {
  USER_LOADING,
  USER_LOADED,
  STUDENT_REGISTER_SUCCESS,
  TEACHER_REGISTER_SUCCESS,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  LOGIN_FAIL,
  TEACHER_REGISTER_FAIL,
  STUDENT_REGISTER_FAIL,
  AUTH_ERROR,
  EDIT_PROFILE,
} from "../actions/types";

const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: null,
  isLoading: false,
  isStudent: false,
  isTeacher: false,
  user: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case USER_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case EDIT_PROFILE:
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
        isStudent: action.payload.is_student,
        isTeacher: action.payload.is_teacher,
        user: action.payload,
      };
    case STUDENT_REGISTER_SUCCESS:
    case TEACHER_REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        ...action.payload,
        isLoading: false,
        isStudent: action.payload.is_student,
        isTeacher: action.payload.is_teacher,
        isAuthenticated: true,
      };
    case LOGOUT_SUCCESS:
    case TEACHER_REGISTER_FAIL:
    case STUDENT_REGISTER_FAIL:
    case AUTH_ERROR:
    case LOGIN_FAIL:
      localStorage.removeItem("token");
      return {
        ...state,
        user: null,
        token: null,
        isLoading: false,
        isStudent: false,
        isTeacher: false,
        isAuthenticated: false,
      };

    default:
      return state;
  }
}
