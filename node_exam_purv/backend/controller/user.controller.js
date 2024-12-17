const User = require("../models/user.Schema");
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

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
            };
            const token = jwt.sign(tokenData, "private-key");
            return res.status(201).json({
                msg: "User created",
                user: user,
                token,
                // isVarified: user.isVarified,
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
        return res.status(404).json({ msg: "User not found" });
    }

    let isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(404).json({ msg: "Invalid password" });
    }

    let data = {
        email: user.email,
        id: user.id,
        role: user.role,
        username: user.username,
    };

    let token = await jwt.sign(data, "private-key", { expiresIn: '1h' });
    return res.status(200).json({
        msg: "User logged in",
        token: token,
        email: email,
    });
};


module.exports = {signUp,login}