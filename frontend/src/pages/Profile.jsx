import React, { useEffect, useState } from 'react';
import API from '../api';

export default function Profile() {
  const [me, setMe] = useState(null);

  useEffect(() => {
    API.get('/api/auth/me')
      .then(res => setMe(res.data))
      .catch(() => {});
  }, []);

  return (
    <div className="card">
      <h2>Profile</h2>
      {!me && <p>Loading...</p>}
      {me && (
        <div className="profile-grid">
          <div><strong>Name:</strong> {me.name}</div>
          <div><strong>Email:</strong> {me.email}</div>
          <div><strong>Role:</strong> {me.role}</div>
          <div><strong>Employee ID:</strong> {me.employeeId}</div>
          <div><strong>Department:</strong> {me.department || '-'}</div>
          <div><strong>Joined:</strong> {new Date(me.createdAt).toLocaleString()}</div>
        </div>
      )}
    </div>
  );
}
