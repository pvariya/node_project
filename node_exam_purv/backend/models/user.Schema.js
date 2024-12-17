const mongoose = require("mongoose");
const userSchema = mongoose.Schema(
    {
        username: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        role: {
            type: String,
            enum: ['superadmin', 'admin', 'user'],
            default: "USER"
        },
        restaurantId: { type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant' },
    },
);

let User = mongoose.model("User", userSchema);
module.exports = User;
