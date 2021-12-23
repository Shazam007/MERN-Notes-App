import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import postRoutes from "./routes/posts.js";

const app = express();

app.use(bodyParser.json({
	limit: "30mb",
	extended: true
}));
app.use(bodyParser.urlencoded({
	limit: "30mb",
	extended: true
}));
app.use(cors());

//created prefix for all endpoint --> http://localhost:5000/posts/:id/....
app.use("/posts", postRoutes);

const CONNECTION_URL =
	"mongodb+srv://shazam007ToWatch:ykChVu10sJttBBwJ@cluster0.cedms.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

const PORT = process.env.PORT || 5000;

//connct to database using db url and then connect with local port
mongoose
	.connect(CONNECTION_URL, {
		useNewUrlParser: true,
		useUnifiedTopology: true
	})
	.then(() =>
		app.listen(PORT, () => console.log(`server running on port : ${PORT}`))
	)
	.catch((error) => console.log(error.message));