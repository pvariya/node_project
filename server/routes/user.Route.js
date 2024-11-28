const { Router } = require("express");
const {
  signUp,
  login,
  getUser,
  getAdmin,
  verifyUser,
} = require("../controllers/user.controller");

const userRouter = Router();

userRouter.post("/signup",signUp);
userRouter.post("/login", login);
userRouter.get("/get-user", getUser);
userRouter.post("/all-admin", getAdmin);
userRouter.post("/verify/:token/:otp", verifyUser);
module.exports = userRouter;
