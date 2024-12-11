const mongoose = require("mongoose");
const userSchema = mongoose.Schema({
  username: { type: String },
  email: { type: String },
  password: { type: String },
  role: {
    type: String,
    enum: ["USER", "ADMIN", "SUPER_ADMIN"],
    default: "USER",
  },
 
  number: { type: String },
  isActive: { type: Boolean, default: true },
  isVarified: { type: Boolean, default: false },
});
  
let User = mongoose.model("User", userSchema);
module.exports = User;
