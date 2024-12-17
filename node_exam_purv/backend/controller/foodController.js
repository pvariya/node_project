const Food = require("../models/food");
const Restaurant = require("../models/Restaurant");
const errorHandler = require("../utils/errorHandler");

const addFood = async (req, res) => {
  try {
    const { name, price, description } = req.body;
    const { restaurantId } = req.params;
    console.log(req.body)
    if (!name || !price) {
      return res.status(400).json({ message: 'Name and price are required' });
    }
    const restaurant = await Restaurant.findById(restaurantId);
    if (!restaurant) {
      return res.status(404).json({ message: 'Restaurant not found' });
    }
 
    const food = new Food({
      name,
      price,
      description,
      restaurantId,
      createdBy: req.user.id,
    });

    await food.save();
    res.status(201).json({ message: 'Food item added successfully', food });
  } catch (error) {
    errorHandler(res, error);
  }
};


const getAllFoods = async (req, res) => {
  try {
    const { restaurantId } = req.params;
    const foods = await Food.find({ restaurantId }).populate('createdBy', 'name email');
    res.status(200).json({ foods });
  } catch (error) {
    errorHandler(res, error);
  }
};

const updateFood = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price, description } = req.body;

    const food = await Food.findById(id);
    if (!food) {
      return res.status(404).json({ message: 'Food item not found' });
    }

    if (food.createdBy.toString() !== req.user.id.toString()) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    food.name = name || food.name;
    food.price = price || food.price;
    food.description = description || food.description;

    await food.save();
    res.status(200).json({ message: 'Food item updated successfully', food });
  } catch (error) {
    errorHandler(res, error);
  }
};
const deleteFood = async (req, res) => {
  try {
    const { id } = req.params;

    const food = await Food.findById(id);
    if (!food) {
      return res.status(404).json({ message: 'Food item not found' });
    }

    if (food.createdBy.toString() !== req.user.id.toString()) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    // Delete the food item
    await food.remove();
    res.status(200).json({ message: 'Food item deleted successfully' });
  } catch (error) {
    errorHandler(res, error);
  }
};


module.exports = { addFood, getAllFoods, deleteFood, updateFood };
