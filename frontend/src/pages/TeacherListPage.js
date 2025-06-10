import React, { useEffect, useState } from 'react';
import api from '../services/api';
import TeacherCreateModal from '../components/TeacherCreateModal';

const PAGE_SIZE = 10;

const TeacherListPage = () => {
  const [teachers, setTeachers] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    fetchTeachers(page);
    // eslint-disable-next-line
  }, [page]);

  const fetchTeachers = async (pageNum) => {
    setLoading(true);
    try {
      const res = await api.get(`/teachers?page=${pageNum}&limit=${PAGE_SIZE}`);
      setTeachers(res.data.data);
      setTotal(res.data.total);
    } catch (err) {
      alert('Lỗi khi tải danh sách giáo viên!');
    }
    setLoading(false);
  };

  const totalPages = Math.ceil(total / PAGE_SIZE);

  return (
    <div style={{ padding: 24 }}>
      <h2 style={{ marginBottom: 24 }}>Giáo viên</h2>
      {/* Thanh bar chức năng */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
        <input placeholder="Tìm kiếm thông tin" style={{ padding: 6, width: 220, border: '1px solid #ddd', borderRadius: 4 }} />
        <div>
          <button onClick={() => fetchTeachers(page)} style={{ marginRight: 8 }}>Tải lại</button>
          <button onClick={() => setOpenModal(true)} style={{ background: '#1976d2', color: '#fff', border: 'none', borderRadius: 4, padding: '6px 16px' }}>Tạo mới</button>
        </div>
      </div>
      <div style={{ background: '#fff', borderRadius: 8, boxShadow: '0 1px 4px #eee', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead style={{ background: '#f5f5f5' }}>
            <tr>
              <th style={{ padding: 12 }}>Mã</th>
              <th style={{ padding: 12 }}>Giáo viên</th>
              <th style={{ padding: 12 }}>Trình độ (cao nhất)</th>
              <th style={{ padding: 12 }}>Vị trí công tác</th>
              <th style={{ padding: 12 }}>Địa chỉ</th>
              <th style={{ padding: 12 }}>Trạng thái</th>
              <th style={{ padding: 12 }}>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={6} style={{ textAlign: 'center', padding: 24 }}>Đang tải...</td></tr>
            ) : teachers.length === 0 ? (
              <tr><td colSpan={6} style={{ textAlign: 'center', padding: 24 }}>Không có dữ liệu</td></tr>
            ) : teachers.map((t, idx) => (
              <tr key={t.code} style={{ borderBottom: '1px solid #eee' }}>
                <td style={{ padding: 12 }}>{t.code}</td>
                <td style={{ padding: 12 }}>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <img src={require('../assets/avatar.png')} alt="avatar" style={{ width: 36, height: 36, borderRadius: '50%', marginRight: 12 }} />
                    <div>
                      <div style={{ fontWeight: 600 }}>{t.name}</div>
                      <div style={{ fontSize: 13, color: '#888' }}>{t.email}</div>
                      <div style={{ fontSize: 13, color: '#888' }}>{t.phoneNumber}</div>
                    </div>
                  </div>
                </td>
                <td style={{ padding: 12 }}>
                  {t.degrees && t.degrees.length > 0 ? (
                    <>
                      <div>Bậc: {t.degrees[0].type}</div>
                      <div style={{ fontSize: 13, color: '#888' }}>Chuyên ngành: {t.degrees[0].major}</div>
                      <div style={{ fontSize: 13, color: '#888' }}>Trường: {t.degrees[0].school}</div>
                    </>
                  ) : 'N/A'}
                </td>
                <td style={{ padding: 12 }}>
                  {t.positions && t.positions.length > 0 ? (
                    t.positions.map((p, i) => (
                      <div key={p.code} style={{ fontSize: 13, color: '#1976d2' }}>{p.name}{i < t.positions.length - 1 ? ', ' : ''}</div>
                    ))
                  ) : 'N/A'}
                </td>
                <td style={{ padding: 12 }}>{t.address}</td>
                <td style={{ padding: 12 }}>
                  <span style={{ background: '#4caf50', color: '#fff', borderRadius: 4, padding: '2px 10px', fontSize: 13 }}>Đang công tác</span>
                </td>
                <td style={{ padding: 12 }}>
                  <button style={{ background: '#eee', border: 'none', borderRadius: 4, padding: '4px 12px', cursor: 'pointer' }}>Chi tiết</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* Pagination */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', padding: 16 }}>
          <span style={{ marginRight: 16 }}>Tổng: {total}</span>
          <button disabled={page === 1} onClick={() => setPage(page - 1)} style={{ marginRight: 8 }}>&lt;</button>
          <span>Trang {page} / {totalPages}</span>
          <button disabled={page === totalPages} onClick={() => setPage(page + 1)} style={{ marginLeft: 8 }}>&gt;</button>
        </div>
      </div>
      <TeacherCreateModal open={openModal} onClose={() => setOpenModal(false)} onCreated={() => fetchTeachers(page)} />
    </div>
  );
};

export default TeacherListPage; 