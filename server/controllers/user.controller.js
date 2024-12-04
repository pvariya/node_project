const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/user.Schema.js");
const mongoose = require("mongoose");
const { sendMail } = require("../service/sendMail.js");

const signUp = async (req, res) => {
  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email: email });
    if (user) {
      return res.status(403).json({ msg: "User already registered" });
    } else {
      const hash = await bcrypt.hash(password, 10);
      req.body.password = hash;
      let user = await User.create(req.body);
      const tokenData = {
        email: user.email,
        id: user.id,
        role: user.role,
        username: user.username,
        isActive: user.isActive,
      };
      const token = jwt.sign(tokenData, "private-key");
      let otp = Math.round(Math.random() * 10000);
      otps.set(email, otp);
      let html = `<div >  
      <h1>hello ${user.username}</h1>
      <a href=http://localhost:8090/user/verify/${token}/${otp}>verify</a>
   </div>`;
      try {
        await sendMail(email, "Verify", html);
      } catch (error) {
        return res.status(400).json({ message: error.message });
      }
      return res.status(201).json({
        msg: "User created",
        token,
        isVarified: user.isVarified,
      });
    }
  } catch (error) {
    res.status(500).json({ msg: "Error", error: error.message });
  }
};

const login = async (req, res) => {
  let { email, password } = req.body;
  let user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({ msg: "user not found" });
  }
  let isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(404).json({ msg: "invalid password " });
  }
  let data = {
    email: user.email,
    id: user.id,
    role: user.role,
    username: user.username,
    isActive: user.isActive,
    isVarified: user.isVarified,
  };
  let token = await jwt.sign(data, "private-key");
  return res.status(200).json({
    msg: "user loggedIn",
    token: token,
    isVarified: user.isVarified,
    isActive: user.isActive,
    email: email,
  });
};

const verifyUser = async (req, res) => {
  let { token, otp } = req.params;
  let decoded = await jwt.verify(token, "private-key");
  if (!decoded) {
    return res.status(403).json({ msg: "Token is invalid" });
  }
  let oldOtp = otps.get(decoded.email);
  if (oldOtp == otp) {
    let data = await User.findByIdAndUpdate(
      decoded.id,
      { isVarified: true },
      { new: true }
    );
    res.status(200).json({ mag: "Varified", data: data });
  } else {
    res.status(404).json({ err: "invalid otp" });
  }
};

const getAllUser = async (req, res) => {
  try {
    let user = await User.find({ role: "USER" });
    res.json(user);
  } catch (error) {
    res.json({ "getAlluser error": error.message });
  }
};

const getUser = async (req, res) => {
  let userId = req.params.id;
  try {
    let data = await User.findById(userId);
    if (data) {
      res.status(200).json(data);
    } else {
      res.status(404).json({ msg: "User not found" });
    }
  } catch (error) {
    res.json({ "getuser error": error.message });
  }
};
const getAdmin = async (req, res) => {
  try {
    let admin = await User.find({ role: "ADMIN" });
    res.json(admin);
  } catch (error) {
    res.json({ "getAdmin error": error.message });
  }
};

const deletUser = async (req, res) => {
  let { id } = req.params;
  try {
    let data = await User.findByIdAndDelete(id);
    res.status(200).json(data);
  } catch (error) {
    res.json({ "error delet user": error.message });
  }
};

const deletManyUser = async (req, res) => {
  let { ids } = req.params;
  try {
    const idArray = ids.split(",").map((id) => new mongoose.Types.ObjectId(id));
    let data = await User.deleteMany({ _id: { $in: idArray } });
    res.json(data);
  } catch (error) {
    res.json({ "error delet many": error.message });
  }
};

// const verifyAdmin = async (req, res) => {
//   const {id,email} = req.params;
//   let data = await User.findByIdAndUpdate(id,{ isVarified: true }, { new: true });
//   if (!data) {
//     return res.status(404).json({ msg: "admin not found" });
//   } else {
//     let html = `<div >  
//     <h1>hello ${data.username}</h1>
//    <h2>admin verified</h2>
   
//  </div>`;
//    await sendMail(email, "Verify", html)
//     return res.status(200).json({ msg: "admin verified " });
//   }
// };
const verifyAdmin = async (req, res) => {
  let { id } = req.params;
  try {
    let user = await User.findByIdAndUpdate(
      id,
      { isVarified: true },
      { new: true }
    );
    try {
      await sendMail(
        user.email,
        "account approval",
        "<h1>account approved</h1>"
      );
    } catch (error) {
      console.log(error.message);
    }
    res.status(200).json({ msg: "verified" }, { user });
  } catch (error) {
    res.status(404).json({ err: error.message });
  }
};
module.exports = {
  deletUser,
  signUp,
  login,
  getAllUser,
  getAdmin,
  verifyUser,
  getUser,
  deletManyUser,
  verifyAdmin,
};
