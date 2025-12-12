// Imports
require("dotenv").config(); // Allows use of process.env variables
const { PORT, DATABASE_CONNECTION } = process.env;

const productRoute = require("./routes/product.route.js");

const mongoose = require("mongoose"); // Import mongoose to connect to db
const express = require("express"); // Import express and initialize app
const app = express();

// Middleware
app.use(express.json()); // Middleware to parse json
app.use(express.urlencoded({ extended: false })); // Middleware for url-encoded form data

// App listen for port number
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}!`);
});

// Connect to Database
mongoose
	.connect(DATABASE_CONNECTION)
	.then(() => console.log("Connected to Database!"))
	.catch((error) => console.error(`Connection Failed: ${error}`));

// ----- ROUTES ----- //
app.get("/", (req, res) => {
	res.send("Hello from Node API '/' Route");
});

app.use("/api/products", productRoute);
