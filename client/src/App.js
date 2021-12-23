import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { Container, AppBar, Typography, Grid, Grow } from "@material-ui/core";
import Form from "./components/form/form";
import Posts from "./components/posts/posts";
import useStyles from "./styles";
import { useDispatch } from "react-redux";
import { getPosts } from "./actions/posts";

import thumbnail from "./images/thumbnail.jpg";

const App = () => {
	const classes = useStyles();
	const dispatch = useDispatch();
	const [currentID, setCurrentID] = useState(null);

	useEffect(() => {
		//add action to the dispatch --> import from actions
		dispatch(getPosts());
	}, [currentID, dispatch]);

	return (
		<Container maxWidth="lg">
			<AppBar className={classes.appBar} position="static" color="inherit">
				<Typography className={classes.heading} variant="h2" align="center">
					Things To Watch
				</Typography>
				<img
					src={thumbnail}
					className={classes.image}
					alt="Things to watch"
					height="100"
				/>
			</AppBar>
			<Grow in>
				<Container>
					<Grid
						container
						justifyContent="space-between"
						alignItems="stretch"
						spacing={3}
					>
						<Grid item xs={12} sm={7}>
							<Posts setCurrentID={setCurrentID} />
						</Grid>
						<Grid item xs={12} sm={4}>
							<Form currentID={currentID} setCurrentID={setCurrentID} />
						</Grid>
					</Grid>
				</Container>
			</Grow>
		</Container>
	);
};

export default App;
