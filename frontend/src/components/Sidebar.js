import React from 'react';
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const navigate = useNavigate();
  return (
    <aside style={{ width: 220, background: '#f7f7f7', height: '100vh', borderRight: '1px solid #eee', padding: '24px 0' }}>
      <nav>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          <li style={{ padding: '12px 24px', color: '#1976d2', fontWeight: 600 }}>Thống kê</li>
          <li style={{ padding: '12px 24px' }}>Lớp học</li>
          <li style={{ padding: '12px 24px' }}>Học sinh</li>
          <li style={{ padding: '12px 24px', background: '#e3f2fd', color: '#1976d2', fontWeight: 600 }} onClick={() => navigate('/')}>Giáo viên</li>
          <li style={{ padding: '12px 24px' }}>Dữ liệu</li>
          <li style={{ padding: '12px 24px', cursor: 'pointer', color: '#1976d2', fontWeight: 600 }} onClick={() => navigate('/positions')}>Vị trí công tác</li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar; 