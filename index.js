// Imports
require("dotenv").config(); // Allows use of process.env variables
const PORT = Number(process.env.PORT); // Grab port, convert to number

const mongoose = require("mongoose"); // Import mongoose to connect to db
const express = require("express"); // Import express and initialize app
const app = express();
app.use(express.json()); // Middleware to parse json
app.use(express.urlencoded({ extended: false })); // Middleware for url-encoded form data

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

// ----- ROUTES ----- //

// READ ROUTES
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

// CREATE ROUTES
app.post("/api/products", async (req, res) => {
	try {
		const product = await Product.create(req.body);
		res.status(200).json(product);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

// UPDATE ROUTES
app.put("/api/product/:id", async (req, res) => {
	try {
		const { id } = req.params;
		const product = await Product.findByIdAndUpdate(id, req.body);

		if (!product) {
			return res.status(404).json({ message: "Product not found!" });
		}

		const updatedProduct = await Product.findById(id);
		res.status(200).json(updatedProduct);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

// DELETE ROUTES
app.delete("/api/product/:id", async (req, res) => {
	try {
		const { id } = req.params;
		const product = await Product.findByIdAndDelete(id);

		if (!product) {
			return res.status(404).json({ message: "Product not found!" });
		}

		res.status(200).json({ message: "Product deleted successfully!" });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});
