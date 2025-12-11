require("dotenv").config(); // Allows use of process.env variables
const PORT = Number(process.env.PORT); // Grab port, convert to number

const express = require("express"); // Import express and initialize app
const app = express();

const mongoose = require("mongoose"); // Import mongoose to connect to db

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}!`);
});

mongoose
	.connect(process.env.DATABASE_CONNECTION)
	.then(() => console.log("Connected to Database!"))
	.catch((error) => console.error(`Connection Failed: ${error}`));

app.get("/", (req, res) => {
	res.send("Hello from Node API '/' Route");
});
