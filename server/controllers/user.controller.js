const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/user.Schema.js");
// const multer = require("multer");
const { sendMail } = require("../service/sendMail.js");
const otps = new Map();

// const storage = multer.diskStorage({
//   destination: "uploads",
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + file.originalname);
//   },
// });

// const upload = multer({ storage: storage });

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

const getUser = async (req, res) => {
  try {
    let user = await User.find();
    res.json(user);
  } catch (error) {
    res.json({ error: error.message });
  }
};

const getAdmin = async (req, res) => {
  try {
    let admin = await User.find({ role: "ADMIN" });
    res.json(admin);
  } catch (error) {
    console.log(error.message);
  }
};
module.exports = { signUp, login, getUser, getAdmin, verifyUser };
