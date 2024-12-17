const jwt = require('jsonwebtoken');
const User = require('../models/user.Schema');


const authMiddleware = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        if (!token) return res.status(401).json({ message: 'Unauthorized' });

        const decoded = jwt.verify(token, 'private-key');
        const user = await User.findById(decoded.id);
        if (!user) return res.status(401).json({ message: 'User not found' });

        req.user = user;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Unauthorized' });
    }
};

const roleMiddleware = (roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ message: 'Forbidden' });
        }
        next();
    };
};

module.exports = { authMiddleware, roleMiddleware }