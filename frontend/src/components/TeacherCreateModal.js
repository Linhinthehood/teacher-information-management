import React, { useState, useEffect } from 'react';
import api from '../services/api';

const defaultDegree = { type: '', school: '', major: '', year: '', isGraduated: true };

const TeacherCreateModal = ({ open, onClose, onCreated }) => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    address: '',
    identity: '',
    dob: '',
    degrees: [ { ...defaultDegree } ],
    teacherPositionsId: [],
  });
  const [positions, setPositions] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (open) {
      api.get('/teacher-positions').then(res => {
        console.log('Fetched positions:', res.data);
        setPositions(res.data);
      });
    }
  }, [open]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    console.log('Form after handleChange:', { ...form, [e.target.name]: e.target.value });
  };

  const handleDegreeChange = (idx, e) => {
    const newDegrees = form.degrees.map((d, i) => i === idx ? { ...d, [e.target.name]: e.target.value } : d);
    setForm({ ...form, degrees: newDegrees });
    console.log('Degrees after handleDegreeChange:', newDegrees);
  };

  const handleAddDegree = () => {
    setForm({ ...form, degrees: [...form.degrees, { ...defaultDegree }] });
    console.log('Degrees after handleAddDegree:', [...form.degrees, { ...defaultDegree }]);
  };

  const handleRemoveDegree = (idx) => {
    const newDegrees = form.degrees.filter((_, i) => i !== idx);
    setForm({ ...form, degrees: newDegrees });
    console.log('Degrees after handleRemoveDegree:', newDegrees);
  };

  const handlePositionsChange = (e) => {
    const selected = Array.from(e.target.selectedOptions, option => option.value);
    setForm({ ...form, teacherPositionsId: selected });
    console.log('teacherPositionsId after handlePositionsChange:', selected);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const payload = {
      user: {
        name: form.name,
        email: form.email,
        phoneNumber: form.phoneNumber,
        address: form.address,
        identity: form.identity,
        dob: form.dob,
      },
      degrees: form.degrees.map(d => ({
        ...d,
        year: Number(d.year),
        isGraduated: d.isGraduated === 'true' || d.isGraduated === true
      })),
      teacherPositionsId: form.teacherPositionsId,
    };
    console.log('Payload gửi lên backend:', payload);
    try {
      const res = await api.post('/teachers', payload);
      console.log('Phản hồi từ backend:', res.data);
      onCreated();
      onClose();
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        console.error('Lỗi từ backend:', err.response.data.message);
        alert('Tạo giáo viên thất bại: ' + err.response.data.message);
      } else {
        console.error('Lỗi không xác định:', err);
        alert('Tạo giáo viên thất bại!');
      }
    }
    setLoading(false);
  };

  if (!open) return null;

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
      background: 'rgba(0,0,0,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000
    }}>
      <form onSubmit={handleSubmit} style={{ background: '#fff', padding: 32, borderRadius: 12, minWidth: 700, maxWidth: 900 }}>
        <h2 style={{ marginBottom: 16 }}>Tạo mới giáo viên</h2>
        <div style={{ display: 'flex', gap: 32 }}>
          {/* Avatar */}
          <div style={{ flex: '0 0 180px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <img src={require('../assets/avatar.png')} alt="avatar" style={{ width: 120, height: 120, borderRadius: '50%', marginBottom: 16, objectFit: 'cover' }} />
            <div style={{ color: '#888', fontSize: 13, textAlign: 'center' }}>Mặc định</div>
          </div>
          {/* Thông tin cá nhân */}
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', gap: 16, marginBottom: 8 }}>
              <div style={{ flex: 1 }}>
                <label>Họ và tên *</label>
                <input name="name" value={form.name} onChange={handleChange} required style={{ width: '100%', marginBottom: 8 }} />
              </div>
              <div style={{ flex: 1 }}>
                <label>Ngày sinh *</label>
                <input name="dob" type="date" value={form.dob} onChange={handleChange} required style={{ width: '100%', marginBottom: 8 }} />
              </div>
            </div>
            <div style={{ display: 'flex', gap: 16, marginBottom: 8 }}>
              <div style={{ flex: 1 }}>
                <label>Số điện thoại *</label>
                <input name="phoneNumber" value={form.phoneNumber} onChange={handleChange} required style={{ width: '100%', marginBottom: 8 }} />
              </div>
              <div style={{ flex: 1 }}>
                <label>Email *</label>
                <input name="email" value={form.email} onChange={handleChange} required style={{ width: '100%', marginBottom: 8 }} />
              </div>
            </div>
            <div style={{ display: 'flex', gap: 16, marginBottom: 8 }}>
              <div style={{ flex: 1 }}>
                <label>Số CCCD *</label>
                <input name="identity" value={form.identity} onChange={handleChange} required style={{ width: '100%', marginBottom: 8 }} />
              </div>
              <div style={{ flex: 1 }}>
                <label>Địa chỉ *</label>
                <input name="address" value={form.address} onChange={handleChange} required style={{ width: '100%', marginBottom: 8 }} />
              </div>
            </div>
            <div style={{ borderTop: '1px solid #eee', margin: '16px 0 8px 0', paddingTop: 8, fontWeight: 600 }}>Vị trí công tác *</div>
            <select name="teacherPositionsId" multiple value={form.teacherPositionsId} onChange={handlePositionsChange} style={{ width: '100%', marginBottom: 8, minHeight: 40 }}>
              {positions.map(pos => (
                <option key={pos._id} value={pos._id}>{pos.code} - {pos.name}</option>
              ))}
            </select>
          </div>
        </div>
        {/* Học vị */}
        <div style={{ borderTop: '1px solid #eee', margin: '24px 0 8px 0', paddingTop: 8, fontWeight: 600 }}>Học vị</div>
        <div style={{ background: '#f6f8fa', borderRadius: 8, padding: 16, marginBottom: 16 }}>
          {form.degrees.map((degree, idx) => (
            <div key={idx} style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 8 }}>
              <select name="type" value={degree.type} onChange={e => handleDegreeChange(idx, e)} style={{ minWidth: 100, marginRight: 8 }} required>
                <option value="">Bậc</option>
                <option value="Cử nhân">Cử nhân</option>
                <option value="Thạc sĩ">Thạc sĩ</option>
                <option value="Tiến sĩ">Tiến sĩ</option>
              </select>
              <input name="school" placeholder="Trường" value={degree.school} onChange={e => handleDegreeChange(idx, e)} required style={{ minWidth: 140, marginRight: 8 }} />
              <input name="major" placeholder="Chuyên ngành" value={degree.major} onChange={e => handleDegreeChange(idx, e)} required style={{ minWidth: 120, marginRight: 8 }} />
              <input name="year" type="number" placeholder="Năm/Dự kiến" value={degree.year} onChange={e => handleDegreeChange(idx, e)} required style={{ width: 90, marginRight: 8 }} />
              <label style={{ display: 'flex', alignItems: 'center', fontSize: 13 }}>
                <input type="checkbox" name="isGraduated" checked={degree.isGraduated} onChange={e => handleDegreeChange(idx, { target: { name: 'isGraduated', value: e.target.checked } })} style={{ marginRight: 4 }} />
                Hoàn thành
              </label>
              {form.degrees.length > 1 && (
                <button type="button" onClick={() => handleRemoveDegree(idx)} style={{ marginLeft: 4, color: '#f44336', background: 'none', border: 'none', fontSize: 18, cursor: 'pointer' }}>🗑️</button>
              )}
            </div>
          ))}
          <button type="button" onClick={handleAddDegree} style={{ marginTop: 4, background: '#1976d2', color: '#fff', border: 'none', borderRadius: 4, padding: '4px 16px', fontSize: 14 }}>Thêm</button>
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

export default TeacherCreateModal; 