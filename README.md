# BoundProof MVP

BoundProof is a social travel app to connect people planning the same trip.

## Monorepo Structure

- `frontend/` — Next.js + React + Tailwind CSS client app.
- `backend/` — Express + Socket.io API server with JWT auth.
- `database/schema.sql` — PostgreSQL schema for users, trips, requests, matches, and chat messages.

## Features Included

- Email/password signup + login with JWT.
- Optional Google login placeholder endpoint (`/api/auth/google`) for future OAuth wiring.
- User profile management.
- Trip creation and trip discovery with filters.
- Request-to-join and match acceptance flow.
- Real-time private chat between matched users.
- Interactive map view for trips using Mapbox.
- Dashboard with created trips, joined trips, matches, and recent messages.

## Prerequisites

- Node.js 18+
- PostgreSQL 14+

## 1) Database Setup

```bash
createdb boundproof
psql -d boundproof -f database/schema.sql
```

## 2) Backend Setup

```bash
cd backend
cp .env.example .env
npm install
npm run dev
```

Backend runs on `http://localhost:4000`.

## 3) Frontend Setup

```bash
cd frontend
cp .env.example .env.local
npm install
npm run dev
```

Frontend runs on `http://localhost:3000`.

## Environment Variables

### Backend (`backend/.env`)

- `PORT`: API server port.
- `DATABASE_URL`: PostgreSQL connection string.
- `JWT_SECRET`: JWT signing secret.
- `FRONTEND_URL`: CORS allowlist origin.
- `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET`: reserved for OAuth integration.

### Frontend (`frontend/.env.local`)

- `NEXT_PUBLIC_API_URL`: API base URL (`http://localhost:4000/api`).
- `NEXT_PUBLIC_SOCKET_URL`: Socket server URL (`http://localhost:4000`).
- `NEXT_PUBLIC_MAPBOX_TOKEN`: Mapbox token for map rendering.

## API Overview

- `POST /api/auth/signup`
- `POST /api/auth/login`
- `POST /api/auth/google` (stub)
- `GET /api/profile/me`
- `PUT /api/profile/me`
- `POST /api/trips`
- `GET /api/trips`
- `POST /api/requests/:tripId`
- `POST /api/requests/:requestId/accept`
- `GET /api/matches`
- `GET /api/messages/:matchId`
- `POST /api/messages/:matchId`
- `GET /api/dashboard`

## Deployment Notes

- **Frontend**: Deploy `frontend/` to Vercel.
- **Backend**: Deploy `backend/` to Railway/Render/Fly, then set `NEXT_PUBLIC_API_URL` and `NEXT_PUBLIC_SOCKET_URL`.
- **Database**: Use Supabase Postgres or Railway Postgres and apply `database/schema.sql`.
