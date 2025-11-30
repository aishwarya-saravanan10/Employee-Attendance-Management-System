import React from 'react';
import API from '../api';

export default function MarkAttendance({ compact }) {
  const checkIn = async () => {
    try {
      await API.post('/api/attendance/checkin');
      alert('Checked in successfully');
    } catch (err) {
      alert(err.response?.data?.msg || 'Check-in failed');
    }
  };
  const checkOut = async () => {
    try {
      await API.post('/api/attendance/checkout');
      alert('Checked out successfully');
    } catch (err) {
      alert(err.response?.data?.msg || 'Check-out failed');
    }
  };

  const buttons = (
    <>
      <button onClick={checkIn}>Check In</button>
      <button onClick={checkOut}>Check Out</button>
    </>
  );

  if (compact) return <div>{buttons}</div>;

  return (
    <div className="card">
      <h2>Mark Attendance</h2>
      {buttons}
    </div>
  );
}
