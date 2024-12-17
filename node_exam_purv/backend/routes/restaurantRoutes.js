const express = require('express');
const { createRestaurant, getAllRestaurants, updateRestaurant, deleteRestaurant, assignAdmin } = require('../controller/restaurantController');
const { authMiddleware, roleMiddleware } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', authMiddleware, roleMiddleware(['superadmin']),createRestaurant);
router.get('/', authMiddleware, roleMiddleware(['superadmin']), getAllRestaurants);
router.put('/:id', authMiddleware, roleMiddleware(['superadmin']), updateRestaurant);
router.delete('/:id', authMiddleware, roleMiddleware(['superadmin']), deleteRestaurant);
router.post('/:id/assign-admin', authMiddleware, roleMiddleware(['superadmin']),assignAdmin);

module.exports = router;
