const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

// Protected routes
router.use(protect);

// Profile routes
router.get('/me', userController.getCurrentUser);
router.put('/me', userController.updateProfile);
router.get('/:id/profile', userController.getProfile);

router.get('/', userController.getAllUsers);
router.get('/:id', userController.getUser);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);

module.exports = router;
