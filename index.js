// Imports
require("dotenv").config(); // Allows use of process.env variables
const PORT = Number(process.env.PORT); // Grab port, convert to number

const mongoose = require("mongoose"); // Import mongoose to connect to db
const express = require("express"); // Import express and initialize app
const app = express();
app.use(express.json()); // Middleware to parse json

// App listen for port number
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}!`);
});

// Connect to Database
mongoose
	.connect(process.env.DATABASE_CONNECTION)
	.then(() => console.log("Connected to Database!"))
	.catch((error) => console.error(`Connection Failed: ${error}`));

// Import Database Models
const Product = require("./models/product.model.js");

// ----- ROUTES -----
app.get("/", (req, res) => {
	res.send("Hello from Node API '/' Route");
});

app.get("/api/products", async (req, res) => {
	try {
		const products = await Product.find({});
		res.status(200).json(products);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

app.get("/api/product/:id", async (req, res) => {
	try {
		const { id } = req.params;
		const product = await Product.findById(id);
		res.status(200).json(product);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

app.post("/api/products", async (req, res) => {
	try {
		const product = await Product.create(req.body);
		res.status(200).json(product);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});
