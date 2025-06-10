import React, { useState } from 'react';
import api from '../services/api';

const PositionCreateModal = ({ open, onClose, onCreated }) => {
  const [form, setForm] = useState({
    code: '',
    name: '',
    des: '',
    isActive: true
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post('/teacher-positions', {
        ...form,
        isActive: form.isActive === 'true' || form.isActive === true
      });
      onCreated();
      onClose();
    } catch (err) {
      alert('Tạo vị trí công tác thất bại!');
    }
    setLoading(false);
  };

  if (!open) return null;

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
      background: 'rgba(0,0,0,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000
    }}>
      <form onSubmit={handleSubmit} style={{ background: '#fff', padding: 32, borderRadius: 12, minWidth: 400, maxWidth: 500 }}>
        <h2 style={{ marginBottom: 16 }}>Tạo mới vị trí công tác</h2>
        <div style={{ marginBottom: 12 }}>
          <label>Mã vị trí *</label>
          <input name="code" value={form.code} onChange={handleChange} required style={{ width: '100%', marginTop: 4, marginBottom: 8 }} />
        </div>
        <div style={{ marginBottom: 12 }}>
          <label>Tên vị trí *</label>
          <input name="name" value={form.name} onChange={handleChange} required style={{ width: '100%', marginTop: 4, marginBottom: 8 }} />
        </div>
        <div style={{ marginBottom: 12 }}>
          <label>Mô tả</label>
          <textarea name="des" value={form.des} onChange={handleChange} rows={3} style={{ width: '100%', marginTop: 4, marginBottom: 8, resize: 'vertical' }} />
        </div>
        <div style={{ marginBottom: 16 }}>
          <label>Trạng thái</label>
          <select name="isActive" value={form.isActive} onChange={handleChange} style={{ width: '100%', marginTop: 4 }}>
            <option value={true}>Hoạt động</option>
            <option value={false}>Không hoạt động</option>
          </select>
        </div>
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
          <button type="button" onClick={onClose} style={{ padding: '8px 20px' }}>Hủy</button>
          <button type="submit" disabled={loading} style={{ padding: '8px 20px', background: '#1976d2', color: '#fff', border: 'none', borderRadius: 4, fontWeight: 600 }}>
            {loading ? 'Đang lưu...' : 'Tạo mới'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PositionCreateModal; 