# Employee Attendance System - Fullstack (Complete)

Tech stack:
- Frontend: React + Vite + Redux Toolkit + Recharts
- Backend: Node.js + Express + MongoDB (Mongoose)
- Auth: JWT
- Features: Employee & Manager roles, dashboards, calendar views, reports, CSV export.

## Quick Start

1. Backend
   ```bash
   cd backend
   npm install
   # edit .env if needed (MONGO_URI, JWT_SECRET)
   npm run seed
   npm run dev
   ```

2. Frontend
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

3. Open the frontend (default http://localhost:3000)

Sample users (from seed):

- Manager:
  - Email: aishwarya@example.com
  - Password: password123

- Employee:
  - Email: dhara@example.com
  - Password: password123

## Important

- Do NOT commit real MongoDB connection strings or secrets to public GitHub.
- Change `JWT_SECRET` before any real deployment.
