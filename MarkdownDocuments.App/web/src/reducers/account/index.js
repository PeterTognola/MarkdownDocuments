import { combineReducers } from "redux";
import create from "./create";
import update from "./update";
import show from "./show";

export default combineReducers({create, update, show});