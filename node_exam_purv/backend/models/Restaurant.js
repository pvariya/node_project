const mongoose = require('mongoose');

const restaurantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  admins: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
});

const Restaurant = mongoose.model('Restaurant', restaurantSchema);
module.exports = Restaurant