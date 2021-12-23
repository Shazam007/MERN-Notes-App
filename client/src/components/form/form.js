import React, { useState, useEffect } from "react";
import useStyles from "./styles";
import { TextField, Button, Typography, Paper } from "@material-ui/core";
import FileBase from "react-file-base64";
import { useDispatch, useSelector } from "react-redux";
import { createPost, updatePost } from "../../actions/posts";

const Form = ({ currentID, setCurrentID }) => {
	const classes = useStyles();

	const dispatch = useDispatch();

	const post = useSelector((state) =>
	//find the post and data for selected post --> current id
		currentID ? state.posts.find((p) => p._id === currentID) : null
	);

	const [postData, setPostData] = useState({
		creator: "",
		title: "",
		message: "",
		tags: "",
		selectedFile: "",
	});

	useEffect(() => {
		if (post) {
			setPostData(post);
		}
	}, [post]);

	const handleSubmit = (e) => {
		//handle the form submit event
		e.preventDefault();

		if (currentID) {
			dispatch(updatePost(currentID, postData));
		} else {
			dispatch(createPost(postData));
		}

		clearForm();
	};

	const clearForm = () => {
		//handle the form clear event
		// this is where the setter method used
		setCurrentID(null);
		setPostData({
			creator: "",
			title: "",
			message: "",
			tags: "",
			selectedFile: "",
		});
	};

	return (
		<Paper className={classes.paper}>
			<form
				autoComplete="off"
				noValidate
				className={`${classes.form} ${classes.root}`}
				onSubmit={handleSubmit}
			>
				<Typography variant="h6">
					{!currentID ? "Add thing to watch" : "Edit"}
				</Typography>
				<TextField
					name="creator"
					variant="outlined"
					label="Creator"
					fullWidth
					value={postData.creator}
					onChange={(event) =>
						setPostData({ ...postData, creator: event.target.value })
					}
				/>
				<TextField
					name="title"
					variant="outlined"
					label="Title"
					fullWidth
					value={postData.title}
					onChange={(event) =>
						setPostData({ ...postData, title: event.target.value })
					}
				/>
				<TextField
					name="message"
					variant="outlined"
					label="Message"
					fullWidth
					value={postData.message}
					onChange={(event) =>
						setPostData({ ...postData, message: event.target.value })
					}
				/>
				<TextField
					name="tags"
					variant="outlined"
					label="Tags"
					fullWidth
					value={postData.tags}
					onChange={(event) =>
						setPostData({ ...postData, tags: event.target.value.split(",") })
					}
				/>
				<div className={classes.fileInput}>
					<FileBase
						type="file"
						mulitple="false"
						onDone={({ base64 }) =>
							setPostData({ ...postData, selectedFile: base64 })
						}
					/>
				</div>
				<Button
					className={classes.buttonSubmit}
					variant="contained"
					color="primary"
					size="large"
					type="submit"
					fullWidth
				>
					Submit
				</Button>
				<Button
					variant="contained"
					color="secondary"
					size="small"
					onClick={clearForm}
					fullWidth
				>
					Clear
				</Button>
			</form>
		</Paper>
	);
};

export default Form;
