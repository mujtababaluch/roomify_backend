# Roomify Backend (Express + MongoDB + JWT)

A minimal, production-ready backend for a room booking app built with Express, MongoDB (Mongoose), and JWT authentication.

## Quick Start

```bash
cp .env.example .env
# edit .env as needed
npm i
npm run seed   # creates sample rooms and an admin user
npm run dev    # starts server with nodemon
```

### Default Admin (after seeding)
- Email: admin@roomify.local
- Password: admin123
- Role: admin

## API Overview (Base URL: `/api`)

### Auth
- `POST /api/auth/register` — body: `{ name, email, password }`
- `POST /api/auth/login` — body: `{ email, password }`
- `GET  /api/auth/me` — requires auth; returns current user

### Rooms
- `GET  /api/rooms` — list rooms (query: `capacity`, `q` for search)
- `GET  /api/rooms/:id` — room details
- `POST /api/rooms` — **admin** create room
- `PATCH /api/rooms/:id` — **admin** update room
- `DELETE /api/rooms/:id` — **admin** delete room

### Bookings
- `POST /api/bookings` — create booking; body: `{ roomId, startTime, endTime, notes }`
- `GET  /api/bookings/me` — current user's bookings
- `GET  /api/bookings` — **admin** get all bookings (filters optional)
- `DELETE /api/bookings/:id` — cancel booking (owner or admin)

**Booking conflict rule:** overlapping bookings for the same room are rejected.

Time format: ISO strings (`2025-08-17T10:00:00.000Z`).

## Folder Structure

```
src/
  config/db.js
  index.js
  middleware/auth.js
  middleware/error.js
  models/User.js
  models/Room.js
  models/Booking.js
  routes/auth.routes.js
  routes/room.routes.js
  routes/booking.routes.js
  controllers/*.js
  utils/asyncHandler.js
  utils/validators.js
seed/seed.js
```

## Notes
- Uses `helmet`, `cors`, `morgan` for basic security/logging.
- JWT in `Authorization: Bearer <token>`.
- Add `CORS_ORIGIN` in `.env` to match your Flutter dev origin if needed.
