import { combineReducers } from "redux";
import encounters from "./encounters";
import agents from "./agents";
import clusters from "./clusters";
import errors from "./errors";
import messages from "./messages";
import auth from "./auth";
import navlinks from "./navlinks";

export default combineReducers({
  encounters,
  agents,
  clusters,
  errors,
  messages,
  auth,
  navlinks,
});
