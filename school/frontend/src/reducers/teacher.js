import { GET_SUBJECT, GET_TEACHER, SINGLE_TEACHER } from "../actions/types";

const initialState = {
  subjects: [],
  teachers: [],
  teach: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_SUBJECT:
      return {
        ...state,
        subjects: action.payload,
      };
    case GET_TEACHER:
      return {
        ...state,
        teachers: action.payload,
      };
    case SINGLE_TEACHER:
      return {
        ...state,
        teach: action.payload,
      };
    default:
      return state;
  }
}
