import axios from "axios";

// const url = "http://localhost:5000/posts";

export const fetchPosts = () => axios.get("http://localhost:5000/posts");

export const createPost = (newPost) => axios.post("http://localhost:5000/posts", newPost);

export const updatePost = (id, updatedPost) =>
	axios.patch(`http://localhost:5000/posts/${id}`, updatedPost);

export const deletePost = (id) => axios.delete(`http://localhost:5000/posts/${id}`);

export const likePost = (id) => axios.patch(`http://localhost:5000/posts/${id}/likePost`);