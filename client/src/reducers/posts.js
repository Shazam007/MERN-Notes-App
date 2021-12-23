// posts reducer that include necesary actions

//state need to always have a value, that is why an empty array

export default (posts = [], action) => {
	//use switch cases instead of if else for best practices -  logics will be added later
	switch (action.type) {
		case "DELETE":
			console.log(action.payload);
			return posts.filter((post) => post._id !== action.payload);
		case "UPDATE":
			return posts.map((post) =>
				post._id === action.payload._id ? action.payload : post
			);
		case "LIKEPOST":
			return posts.map((post) =>
				post._id === action.payload._id ? action.payload : post
			);
		case "FETCH_ALL":
			return action.payload;
		case "CREATE":
			return [...posts, action.payload];
		default:
			return posts;
	}
};

//fetch all creates the posts set
//create method add another one post object to the posts set
//update method updates the updated specific post only
