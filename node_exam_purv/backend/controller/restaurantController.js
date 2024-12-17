const Restaurant = require("../models/Restaurant");
const errorHandler = require("../utils/errorHandler");
const User = require("../models/user.Schema");
const createRestaurant = async (req, res) => {
  try {
    const { name, location } = req.body;

    const restaurant = new Restaurant({
      name,
      location,
      createdBy: req.user.id,
      admins: [],
    });

    await restaurant.save();
    res.status(201).json({ message: 'Restaurant created successfully', restaurant });
  } catch (error) {
    errorHandler(res, error);
  }
};

const getAllRestaurants = async (req, res) => {
  try {
    const restaurants = await Restaurant.find().populate('createdBy', 'name email');
    res.status(200).json({ restaurants });
  } catch (error) {
    errorHandler(res, error);
  }
};


const updateRestaurant = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, location } = req.body;

    const restaurant = await Restaurant.findById(id);
    if (!restaurant) {
      return res.status(404).json({ message: 'Restaurant not found' });
    }

    restaurant.name = name || restaurant.name;
    restaurant.location = location || restaurant.location;

    await restaurant.save();
    res.status(200).json({ message: 'Restaurant updated successfully', restaurant });
  } catch (error) {
    errorHandler(res, error);
  }
};


const deleteRestaurant = async (req, res) => {
  try {
    const { id } = req.params;
    const restaurant = await Restaurant.findById(id);

    if (!restaurant) {
      return res.status(404).json({ message: 'Restaurant not found' });
    }

    await restaurant.remove();
    res.status(200).json({ message: 'Restaurant deleted successfully' });
  } catch (error) {
    errorHandler(res, error);
  }
};
const assignAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const { adminId } = req.body;

    const restaurant = await Restaurant.findById(id);
    if (!restaurant) {
      return res.status(404).json({ message: 'Restaurant not found' });
    }

    const admin = await User.findById(adminId);
    if (!admin || admin.role !== 'admin') {
      return res.status(400).json({ message: 'User is not an admin' });
    }

    restaurant.admins.push(admin._id);
    await restaurant.save();

    res.status(200).json({ message: 'Admin assigned successfully', restaurant });
  } catch (error) {
    errorHandler(res, error);
  }
};

module.exports = { createRestaurant, getAllRestaurants, updateRestaurant, deleteRestaurant, assignAdmin };
