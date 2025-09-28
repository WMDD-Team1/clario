# Clario - Smart Document & Finance Assistant

## Required Environment

- Node.js v20.3.0 (use `.nvmrc`)
- npm v9.8.0+

## Project Structure

```
project-root/
├─ backend/
├─ frontend/
├─ .gitignore
├─ .nvmrc
├─ README.md
└─ CONTRIBUTING.md
```

## Environment Variables

Create a `.env` file in each folder:

**Backend (`backend/.env`)**

```env
PORT=3000
CORS_ENABLED=true
```

**Frontend (`frontend/.env`)**

```env
VITE_API_BASE_URL=http://localhost:3000/api
```

> Note: Frontend uses `VITE_` prefix to access environment variables via `import.meta.env`.
> Note: Please check Slack for credentials.

---

## Setup

### Backend

```bash
cd backend
npm install
nvm use
npm run dev
```

### Frontend

```bash
cd frontend
npm install
nvm use
npm run dev
```

## Swagger API Documentation

- Start the backend server
- Open [http://localhost:3000/api-docs](http://localhost:3000/api-docs) to view the API specification
