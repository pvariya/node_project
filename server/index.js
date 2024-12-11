require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const userRouter = require("./routes/user.Route");
const connectDb = require("./config/db");
const cors = require("cors");
const productRoute = require("./routes/product.route");
const cartRouter = require("./routes/crat.router");

const PORT = process.env.PORT || 8090;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.get("/", (req, res) => {
  res.send("Welcome to the Express");
});

app.use("/user", userRouter);
app.use("/products", productRoute);
app.use("/cart", cartRouter);
// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  connectDb();
});
