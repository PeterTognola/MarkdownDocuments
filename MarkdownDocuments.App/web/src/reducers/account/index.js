import { combineReducers } from "redux";
import create from "./create";
import update from "./update";
import show from "./show";
import login from "./login";

export default combineReducers({ create, update, show, login });