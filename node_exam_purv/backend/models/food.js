const mongoose = require('mongoose');

const foodSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true, 
    },
    price: {
        type: Number,
        required: true,
        min: [0, 'Price must be a positive number']
    },
    description: { type: String },
    restaurantId: { type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant', required: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
});
const Food = mongoose.model('Food', foodSchema);
module.exports = Food