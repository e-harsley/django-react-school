import { combineReducers } from "redux";
import auth from "./auth";
import errors from "./errors";
import messages from "./messages";
import course from "./course";
import teacher from "./teacher";
export default combineReducers({
  auth,
  errors,
  messages,
  course,
  teacher,
});
