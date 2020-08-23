import {
  GET_COURSE,
  ADD_COURSE,
  GET_MODULES,
  ADD_MODULE,
  EDIT_COURSE,
  DELETE_COURSE,
  EDIT_MODULE,
  DELETE_MODULE,
} from "../actions/types";

const initialState = {
  courses: [],
  modules: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_COURSE:
      return {
        ...state,
        courses: action.payload,
      };
    case ADD_COURSE:
      return {
        ...state,
        courses: [...state.courses, action.payload],
      };
    case EDIT_COURSE:
      return {
        ...state,
        courses: [action.payload],
      };
    case DELETE_COURSE:
      return {
        ...state,
        courses: state.courses.filter((course) => course.id !== action.payload),
      };
    case GET_MODULES:
      return {
        ...state,
        modules: action.payload,
      };

    case ADD_MODULE:
      return {
        ...state,
        modules: [...state.modules, action.payload],
      };
    case EDIT_MODULE:
      return {
        ...state,
        modules: state.modules.map((module) =>
          module.id === action.payload.id
            ? {
                ...module,
                title: action.payload.title,
                content: action.payload.content,
              }
            : module
        ),
      };
    case DELETE_MODULE:
      return {
        ...state,
        modules: state.modules.filter((module) => module.id !== action.payload),
      };
    default:
      return state;
  }
}
