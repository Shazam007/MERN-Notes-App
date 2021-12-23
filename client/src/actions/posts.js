// this is where the api connect with the app.js
// api exports the api calls as functions
// here those functions use as actions

import axios from "axios";
import * as api from "../api";

//async (dispatch) =>  usage of redux thunk
export const getPosts = () => async (dispatch) => {
	try {
		const {
			data
		} = await api.fetchPosts();
		//response included res.data

		//instead of returning data, data saved with redux

		dispatch({
			type: "FETCH_ALL",
			payload: data
		});
		//add all posts that grabbed from db to the store
	} catch (error) {
		console.log(error);
	}
};

//create post action
export const createPost = (post) => async (dispatch) => {
	try {
		const {
			data
		} = await api.createPost(post);
		dispatch({
			type: "CREATE",
			payload: data
		});
	} catch (error) {
		console.log(error);
	}
};

export const updatePost = (id, post) => async (dispatch) => {
	try {
		//here the db updated
		const {
			data
		} = await api.updatePost(id, post);
		//saving in the store state
		dispatch({
			type: "UPDATE",
			payload: data
		});
	} catch (error) {
		console.log(error);
	}
};

export const deletePost = (id) => async (dispatch) => {
	try {
		//remove the post from mongo database
		await api.deletePost(id);

		//remove from the application global state
		dispatch({
			type: "DELETE",
			payload: id
		});
	} catch (error) {
		console.log(error);
	}
};

export const likePost = (id) => async (dispatch) => {
	try {
		const {
			data
		} = await api.likePost(id);

		dispatch({
			type: "LIKEPOST",
			payload: data
		});
	} catch (error) {
		console.log(error);
	}
};