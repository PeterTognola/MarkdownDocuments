import { combineReducers } from "redux";
import create from "./create";
import update from "./update";
import login from "./login";

export default combineReducers({ create, update, login });