import React, { useState } from 'react';
import API from '../api';

export default function Reports() {
  const [employeeId, setEmployeeId] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [rows, setRows] = useState([]);

  const generate = () => {
    if (!startDate || !endDate) {
      alert('Select start and end date');
      return;
    }
    API.get('/api/attendance/all', {
      params: {
        employeeId: employeeId || undefined,
        startDate,
        endDate
      }
    }).then(res => setRows(res.data)).catch(() => {});
  };

  
  const exportCsv = async () => {
    if (!startDate || !endDate) {
      alert('Select start and end date');
      return;
    }

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("You are not logged in!");
        return;
      }

      const url =
        API.defaults.baseURL +
        `/api/attendance/export?startDate=${startDate}&endDate=${endDate}${
          employeeId ? `&employeeId=${employeeId}` : ""
        }`;

      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const blob = await response.blob();
      const downloadUrl = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = downloadUrl;
      a.download = "attendance_report.csv";
      a.click();

      window.URL.revokeObjectURL(downloadUrl);
    } catch (error) {
      console.error("CSV Download Error:", error);
      alert("Error downloading CSV");
    }
  };

  return (
    <div className="card">
      <h2>Reports</h2>
      <div className="filters">
        <input
          placeholder="Employee ID (leave empty for all)"
          value={employeeId}
          onChange={e => setEmployeeId(e.target.value)}
        />
        <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} />
        <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} />
        <button onClick={generate}>Generate</button>
        <button onClick={exportCsv}>Export CSV</button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Employee ID</th>
            <th>Name</th>
            <th>Dept</th>
            <th>Status</th>
            <th>Check In</th>
            <th>Check Out</th>
            <th>Hours</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(r => (
            <tr key={r._id}>
              <td>{r.date}</td>
              <td>{r.userId?.employeeId}</td>
              <td>{r.userId?.name}</td>
              <td>{r.userId?.department}</td>
              <td>{r.status}</td>
              <td>{r.checkInTime ? new Date(r.checkInTime).toLocaleTimeString() : '-'}</td>
              <td>{r.checkOutTime ? new Date(r.checkOutTime).toLocaleTimeString() : '-'}</td>
              <td>{r.totalHours}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
