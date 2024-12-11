const { Router } = require("express");
const {
  signUp,
  login,
  getAllUser,
  getAdmin,
  verifyUser,
  deletManyUser,
  getUser,
  deletUser,
  verifyAdmin,
  deleteAdmin,
} = require("../controllers/user.controller");
const decoded = require("../middleware/decodeJWT");
const { superAdmin } = require("../middleware/superAdmin");

const userRouter = Router();

userRouter.post("/signup", signUp);
userRouter.post("/login", login);
userRouter.get("/getAll", getAllUser);
userRouter.get("/all-admin", decoded, superAdmin, getAdmin);
userRouter.post("/verify/:token/:otp", verifyUser);
userRouter.delete("/deletAllUser/:ids", deletManyUser);
userRouter.get("/getUser/:id", getUser);
userRouter.delete("/deleteUser/:id", deletUser);
userRouter.patch("/verifyAdmin/:id", decoded, superAdmin, verifyAdmin);
userRouter.delete("/deleteAdmin/:id", decoded, superAdmin, deleteAdmin);

module.exports = userRouter;
