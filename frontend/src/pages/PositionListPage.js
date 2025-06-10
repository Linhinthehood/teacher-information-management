import React, { useEffect, useState } from 'react';
import api from '../services/api';
import PositionCreateModal from '../components/PositionCreateModal';

const PositionListPage = () => {
  const [positions, setPositions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const fetchPositions = async () => {
    setLoading(true);
    try {
      const res = await api.get('/teacher-positions');
      setPositions(res.data);
    } catch (err) {
      alert('Lỗi khi tải danh sách vị trí công tác!');
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchPositions();
  }, []);

  return (
    <div style={{ padding: 24 }}>
      <h2 style={{ marginBottom: 24 }}>Danh sách vị trí công tác</h2>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 12, gap: 8 }}>
        <button onClick={fetchPositions}>Làm mới</button>
        <button style={{ background: '#1976d2', color: '#fff', border: 'none', borderRadius: 4, padding: '6px 16px' }} onClick={() => setOpenModal(true)}>Tạo</button>
      </div>
      <div style={{ background: '#fff', borderRadius: 8, boxShadow: '0 1px 4px #eee', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead style={{ background: '#f5f5f5' }}>
            <tr>
              <th style={{ padding: 12 }}>STT</th>
              <th style={{ padding: 12 }}>Mã</th>
              <th style={{ padding: 12 }}>Tên</th>
              <th style={{ padding: 12 }}>Trạng thái</th>
              <th style={{ padding: 12 }}>Mô tả</th>
              <th style={{ padding: 12 }}></th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={6} style={{ textAlign: 'center', padding: 24 }}>Đang tải...</td></tr>
            ) : positions.length === 0 ? (
              <tr><td colSpan={6} style={{ textAlign: 'center', padding: 24 }}>Không có dữ liệu</td></tr>
            ) : positions.map((p, idx) => (
              <tr key={p._id} style={{ borderBottom: '1px solid #eee' }}>
                <td style={{ padding: 12 }}>{idx + 1}</td>
                <td style={{ padding: 12 }}>{p.code}</td>
                <td style={{ padding: 12 }}>{p.name}</td>
                <td style={{ padding: 12 }}>
                  <span style={{ background: '#4caf50', color: '#fff', borderRadius: 4, padding: '2px 10px', fontSize: 13 }}>Hoạt động</span>
                </td>
                <td style={{ padding: 12 }}>{p.des}</td>
                <td style={{ padding: 12 }}>
                  <button style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 18 }}>⚙️</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <PositionCreateModal open={openModal} onClose={() => setOpenModal(false)} onCreated={fetchPositions} />
    </div>
  );
};

export default PositionListPage; 