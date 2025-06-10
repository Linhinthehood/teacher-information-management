const mongoose = require('mongoose');

const degreeSchema = new mongoose.Schema({
  type: { type: String, required: true }, // Loại bằng cấp
  school: { type: String, required: true }, // Tên trường đào tạo
  major: { type: String, required: true }, // Chuyên ngành học
  year: { type: Number, required: true }, // Năm tốt nghiệp
  isGraduated: { type: Boolean, default: true } // Trạng thái tốt nghiệp
}, { _id: false });

const teacherSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  isActive: {
    type: Boolean,
    default: true
  },
  isDeleted: {
    type: Boolean,
    default: false
  },
  code: {
    type: String,
    required: true,
    unique: true,
    length: 10
  },
  teacherPositionsId: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'TeacherPosition'
  }],
  degrees: [degreeSchema]
}, {
  timestamps: true
});

const Teacher = mongoose.model('Teacher', teacherSchema);

module.exports = Teacher; 