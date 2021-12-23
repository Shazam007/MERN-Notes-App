import mongoose from "mongoose";
import PostMessage from "../models/postMessage.js";

export const getPosts = async (req, res) => {
	try {
		const postMessage = await PostMessage.find();

		//returning the accuired posetMessage json
		res.status(200).json(postMessage);
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};

export const createPost = async (req, res) => {
	const post = req.body; //get from frontend

	const newPost = new PostMessage(post); //send to the model

	try {
		await newPost.save();
		res.status(201).json(newPost);
	} catch (error) {
		res.status(409).json({ message: error.message });
	}
};

export const updatePost = async (req, res) => {
	//rename witinh the distructure
	const { id: _id } = req.params;
	const post = req.body;

	//to check the _id is valid mongoose type
	if (!mongoose.Types.ObjectId.isValid(_id))
		return res.status(404).send("No post with that ID");

	// new true for get the respone again, the updated one
	const updatedPost = await PostMessage.findByIdAndUpdate(
		_id,
		{ ...post, _id },
		{
			new: true,
		}
	);

	//this is the resonse that send back with the updated post
	res.json(updatedPost);
};

export const deletePost = async (req, res) => {
	const { id } = req.params;
	if (!mongoose.Types.ObjectId.isValid(id))
		return res.status(404).send("No post with that ID");

	await PostMessage.findByIdAndRemove(id);

	res.json({ message: "Post deleted successfully" });
};

export const likePost = async (req, res) => {
	const { id } = req.params;
	if (!mongoose.Types.ObjectId.isValid(id))
		return res.status(404).send("No post with that ID");

	const post = await PostMessage.findById(id);
	const updatedPost = await PostMessage.findByIdAndUpdate(
		id,
		{ likeCount: post.likeCount + 1 },
		{ new: "true" }
	);
	res.json(updatedPost);
};
