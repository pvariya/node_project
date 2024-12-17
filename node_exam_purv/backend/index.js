const express = require("express");
const app = express();
const path = require("path");
const userRouter = require("./routes/user.route");
const connectDb = require("./config/db");
const router = require("./routes/restaurantRoutes");
const foodRouter = require("./routes/foodRoutes");


const PORT = process.env.PORT || 8090;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));


app.get("/", (req, res) => {
    res.send("Welcome to the Express");
});

app.use("/user", userRouter);
app.use('/restaurant',router)
app.use("/food",foodRouter)
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  connectDb();
});