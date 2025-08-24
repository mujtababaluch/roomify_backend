import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { connectDB } from './config/db.js';
import authRoutes from './routes/auth.routes.js';
import roomRoutes from './routes/room.routes.js';
import bookingRoutes from './routes/booking.routes.js';
import { notFound, errorHandler } from './middleware/error.js';

const app = express();

// Middlewares
app.use(helmet());
app.use(express.json());
app.use(morgan('dev'));
app.use(cors({
  origin: '*',
  credentials: true,
}));

// Routes
app.get('/api/health', (req, res) => res.json({ status: 'ok', time: new Date().toISOString() }));
app.use('/api/auth', authRoutes);
app.use('/api/rooms', roomRoutes);
app.use('/api/bookings', bookingRoutes);

// Error handlers
app.use(notFound);
app.use(errorHandler);

// Start
const PORT = process.env.PORT || 5000;
connectDB().then(() => {
  app.listen(PORT, () => console.log(`Roomify API running on port ${PORT}`));
});
