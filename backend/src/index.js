const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();
const connectDB = require('./config/db');

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Routes
const userRoutes = require('./routes/user.route');
app.use('/api/users', userRoutes);
const teacherRoutes = require('./routes/teacher.route');
app.use('/api/teachers', teacherRoutes);
const teacherPositionRoutes = require('./routes/teacherPosition.route');
app.use('/api/teacher-positions', teacherPositionRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Teacher Management System API' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 