const express = require("express");
const router = express.Router();

const {
	getAllProducts,
	getProductByID,
	createProduct,
	updateProductByID,
	deleteProductByID,
} = require("../controllers/product.controller");

// READ ROUTES
router.get("/", getAllProducts);
router.get("/:id", getProductByID);

// CREATE ROUTES
router.post("/", createProduct);

// UPDATE ROUTES
router.put("/:id", updateProductByID);

// DELETE ROUTES
router.delete("/:id", deleteProductByID);

module.exports = router;
