const { Router } = require("express");
const {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/product.controller");
const decoded = require("../middleware/decodeJWT");
const upload = require("../utils/imgUplaod");

const productRoute = Router();
productRoute.get("/", getProducts);
productRoute.get("/:productId", getProductById);
productRoute.post("/", decoded, upload.single("img"), createProduct);
productRoute.patch("/:productId", decoded, updateProduct);
productRoute.delete("/:productId", decoded, deleteProduct);

module.exports = productRoute;
