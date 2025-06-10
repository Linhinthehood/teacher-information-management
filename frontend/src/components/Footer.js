import React from 'react';

const Footer = () => (
  <footer style={{ background: '#fff', padding: '10px 0', borderTop: '1px solid #eee', textAlign: 'center', fontSize: 14, color: '#888', marginTop: 24 }}>
    School System &copy; {new Date().getFullYear()}
  </footer>
);

export default Footer; 