import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [employeeId, setEmployeeId] = useState('');
  const [department, setDepartment] = useState('');
  const navigate = useNavigate();

  const onSubmit = async e => {
    e.preventDefault();
    try {
      await API.post('/api/auth/register', {
        name,
        email,
        password,
        employeeId,
        department
      });
      alert('Registered successfully. Please login.');
      navigate('/login');
    } catch (err) {
      alert(err.response?.data?.msg || 'Registration failed');
    }
  };

  return (
    <div className="card auth-card">
      <h2>Register</h2>
      <form onSubmit={onSubmit}>
        <label>Name</label>
        <input value={name} onChange={e => setName(e.target.value)} />
        <label>Email</label>
        <input value={email} onChange={e => setEmail(e.target.value)} />
        <label>Password</label>
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
        <label>Employee ID</label>
        <input value={employeeId} onChange={e => setEmployeeId(e.target.value)} />
        <label>Department</label>
        <input value={department} onChange={e => setDepartment(e.target.value)} />
        <button type="submit">Register</button>
      </form>
    </div>
  );
}
