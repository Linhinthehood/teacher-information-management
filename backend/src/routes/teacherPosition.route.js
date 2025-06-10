const express = require('express');
const router = express.Router();
const teacherPositionController = require('../controllers/teacherPosition.controller');

// Lấy danh sách vị trí công tác
router.get('/', teacherPositionController.getTeacherPositions);
// Tạo mới vị trí công tác
router.post('/', teacherPositionController.createTeacherPosition);

module.exports = router; 