# Teacher Management System

A web-based application for managing teacher information and administrative tasks in educational institutions. Built with the MERN stack (MongoDB, Express.js, React.js, Node.js) following the MVC architecture pattern.

## Project Structure

```
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── middleware/
│   │   └── config/
│   └── package.json
└── frontend/
    ├── src/
    │   ├── components/
    │   ├── pages/
    │   ├── services/
    │   └── utils/
    └── package.json
```

## Features
- Manage teacher profiles, positions, and degrees
- CRUD for teachers and teacher positions
- Pagination for teacher list
- User-friendly UI with React
- Real-time notification ready (websocket placeholder)

## Prerequisites
- Node.js (v16 or higher recommended)
- MongoDB
- npm or yarn

## Setup Instructions

### Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the backend directory with the following variables:
   ```
   PORT=3000
   MONGODB_URI=mongodb://localhost:27017/teacher_management
   JWT_SECRET=your_jwt_secret_key
   NODE_ENV=development
   ```
4. Start the backend server:
   ```bash
   npm run dev
   ```

### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the frontend directory with:
   ```
   REACT_APP_API_BASE_URL=http://localhost:3000/api
   ```
4. Start the frontend development server:
   ```bash
   npm start
   ```

## Main API Endpoints

### Teacher
- `GET /api/teachers` — List teachers (with pagination)
- `POST /api/teachers` — Create new teacher

### Teacher Position
- `GET /api/teacher-positions` — List all positions
- `POST /api/teacher-positions` — Create new position

## Technologies Used
- MongoDB — Database
- Express.js — Backend framework
- React.js — Frontend framework
- Node.js — Runtime environment
- JWT — Authentication (ready for future use)
- Axios — API calls

## Author
- Project for education purpose (MindX) 