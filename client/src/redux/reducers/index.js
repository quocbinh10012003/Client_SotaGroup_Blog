import { combineReducers } from "redux";
import posts from './posts.js'
import modal from './modal.js';
import modalUpdate from './modalUpdate.js';
export default combineReducers({
    posts,
    modal,
    modalUpdate,
});