const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');

// Create user
router.post('/', userController.createUser);
// Get all users
router.get('/', userController.getAllUsers);
// Get user by ID
router.get('/:id', userController.getUserById);
// Update user
router.put('/:id', userController.updateUser);
// Delete user (soft delete)
router.delete('/:id', userController.deleteUser);

module.exports = router; 