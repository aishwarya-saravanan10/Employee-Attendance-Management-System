import React, { useEffect, useState } from 'react';
import API from '../api';
import MarkAttendance from './MarkAttendance';

export default function EmployeeDashboard() {
  const [data, setData] = useState(null);

  useEffect(() => {
    API.get('/api/dashboard/employee')
      .then(res => setData(res.data))
      .catch(() => {});
  }, []);

  if (!data) return <div className="card"><h2>Dashboard</h2><p>Loading...</p></div>;

  const { today, summary, totalHoursThisMonth, recent } = data;

  return (
    <div className="grid">
      <div className="card">
        <h2>Today</h2>
        <p>Status: {today ? (today.checkInTime ? (today.checkOutTime ? 'Checked Out' : 'Checked In') : 'Not Checked In') : 'No record'}</p>
        <p>Check In: {today?.checkInTime ? new Date(today.checkInTime).toLocaleTimeString() : '-'}</p>
        <p>Check Out: {today?.checkOutTime ? new Date(today.checkOutTime).toLocaleTimeString() : '-'}</p>
      </div>

      <div className="card">
        <h2>This Month Summary</h2>
        <div className="stats-row">
          <div className="stat-box green">
            <span>Present</span>
            <strong>{summary.present}</strong>
          </div>
          <div className="stat-box red">
            <span>Absent</span>
            <strong>{summary.absent}</strong>
          </div>
          <div className="stat-box yellow">
            <span>Late</span>
            <strong>{summary.late}</strong>
          </div>
          <div className="stat-box orange">
            <span>Half Day</span>
            <strong>{summary.halfDay}</strong>
          </div>
        </div>
        <p className="mt">Total Hours this month: <strong>{totalHoursThisMonth.toFixed(2)}</strong></p>
      </div>

      <div className="card">
        <h2>Quick Actions</h2>
        <MarkAttendance compact />
      </div>

      <div className="card">
        <h2>Recent Attendance (Last 7 days)</h2>
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Status</th>
              <th>Check In</th>
              <th>Check Out</th>
              <th>Hours</th>
            </tr>
          </thead>
          <tbody>
            {recent.map(r => (
              <tr key={r._id}>
                <td>{r.date}</td>
                <td>{r.status}</td>
                <td>{r.checkInTime ? new Date(r.checkInTime).toLocaleTimeString() : '-'}</td>
                <td>{r.checkOutTime ? new Date(r.checkOutTime).toLocaleTimeString() : '-'}</td>
                <td>{r.totalHours}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
