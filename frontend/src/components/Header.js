import React from 'react';

const Header = () => (
  <header style={{ background: '#fff', padding: '12px 24px', borderBottom: '1px solid #eee', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
    <div style={{ fontWeight: 'bold', fontSize: 22, color: '#1976d2' }}>School System</div>
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <span style={{ marginRight: 8 }}>Admin</span>
      <span style={{ background: '#ff9800', color: '#fff', borderRadius: 4, padding: '2px 8px', fontSize: 12 }}>ADMIN</span>
    </div>
  </header>
);

export default Header; 