const express = require('express');
const router = express.Router();
const teacherController = require('../controllers/teacher.controller');

// Lấy danh sách giáo viên (có phân trang)
router.get('/', teacherController.getTeachers);
// Tạo mới giáo viên
router.post('/', teacherController.createTeacher);

module.exports = router; 