import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Sidebar from './components/Sidebar';
import TeacherListPage from './pages/TeacherListPage';
import PositionListPage from './pages/PositionListPage';

const App = () => (
  <Router>
    <div style={{ minHeight: '100vh', background: '#f4f6f8', display: 'flex', flexDirection: 'column' }}>
      <Header />
      <div style={{ display: 'flex', flex: 1 }}>
        <Sidebar />
        <main style={{ flex: 1, minHeight: 'calc(100vh - 120px)', background: '#f4f6f8' }}>
          <Routes>
            <Route path="/" element={<TeacherListPage />} />
            <Route path="/positions" element={<PositionListPage />} />
          </Routes>
        </main>
      </div>
      <Footer />
    </div>
  </Router>
);

export default App;
