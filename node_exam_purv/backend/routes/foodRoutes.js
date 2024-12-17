const express = require('express');
const { authMiddleware, roleMiddleware } = require('../middleware/authMiddleware');
const { addFood, getAllFoods, updateFood, deleteFood } = require('../controller/foodController');
const foodRouter = express.Router();



foodRouter.post('/createFood/', addFood);
foodRouter.get('/:restaurantId', authMiddleware, roleMiddleware(['admin']), getAllFoods);
foodRouter.put('/:id', authMiddleware, roleMiddleware(['admin']), updateFood);
foodRouter.delete('/:id', authMiddleware, roleMiddleware(['admin']), deleteFood);


module.exports = foodRouter;
