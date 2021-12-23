// this one return the producers to main index.js

import {
	combineReducers
} from "redux";

import posts from "./posts";

export default combineReducers({
	posts: posts, // this equals to posts:posts ==> same name therefore can add only once
});