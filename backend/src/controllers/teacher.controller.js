const Teacher = require('../models/teacher.model');
const User = require('../models/user.model');
const TeacherPosition = require('../models/teacherPosition.model');

// Helper: Generate unique 10-digit code
async function generateUniqueCode() {
  let code;
  let exists = true;
  while (exists) {
    code = Math.floor(1000000000 + Math.random() * 9000000000).toString();
    exists = await Teacher.findOne({ code });
  }
  return code;
}

// GET /teachers - Danh sách giáo viên, phân trang
exports.getTeachers = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const teachers = await Teacher.find()
      .populate({
        path: 'userId',
        select: 'name email phoneNumber address'
      })
      .populate({
        path: 'teacherPositionsId',
        select: 'name code des'
      })
      .select('-__v')
      .skip(skip)
      .limit(limit);

    // Định dạng lại dữ liệu trả về
    const result = teachers.map(t => ({
      code: t.code,
      name: t.userId?.name,
      email: t.userId?.email,
      phoneNumber: t.userId?.phoneNumber,
      isActive: t.isActive,
      address: t.userId?.address,
      positions: t.teacherPositionsId?.map(pos => pos ? { name: pos.name, code: pos.code, des: pos.des } : null).filter(Boolean),
      degrees: t.degrees?.map(d => ({
        type: d.type,
        school: d.school,
        major: d.major,
        year: d.year,
        isGraduated: d.isGraduated
      }))
    }));

    res.json({
      page,
      limit,
      total: await Teacher.countDocuments(),
      data: result
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// POST /teachers - Tạo mới giáo viên
exports.createTeacher = async (req, res) => {
  try {
    const { user, teacherPositionsId, degrees, startDate, endDate, isActive } = req.body;
    // Kiểm tra email duy nhất
    const emailExists = await User.findOne({ email: user.email });
    if (emailExists) return res.status(400).json({ message: 'Email already exists' });

    // Tạo user trước
    const newUser = new User({ ...user, role: 'TEACHER' });
    await newUser.save();

    // Sinh code ngẫu nhiên, không trùng
    const code = await generateUniqueCode();

    // Tạo teacher
    const newTeacher = new Teacher({
      userId: newUser._id,
      teacherPositionsId,
      degrees,
      startDate,
      endDate,
      isActive,
      code
    });
    await newTeacher.save();

    res.status(201).json(newTeacher);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}; 