const TeacherPosition = require('../models/teacherPosition.model');

// GET /teacher-positions - Lấy danh sách toàn bộ vị trí công tác
exports.getTeacherPositions = async (req, res) => {
  try {
    const positions = await TeacherPosition.find();
    res.json(positions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// POST /teacher-positions - Tạo mới vị trí công tác
exports.createTeacherPosition = async (req, res) => {
  try {
    const { code, name, des, isActive } = req.body;
    // Kiểm tra code duy nhất
    const codeExists = await TeacherPosition.findOne({ code });
    if (codeExists) return res.status(400).json({ message: 'Code already exists' });

    const newPosition = new TeacherPosition({ code, name, des, isActive });
    await newPosition.save();
    res.status(201).json(newPosition);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}; 