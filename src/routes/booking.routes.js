import { Router } from 'express';
import { createBooking, myBookings, cancelBooking, allBookings } from '../controllers/booking.controller.js';
import { requireAuth, requireAdmin } from '../middleware/auth.js';

const router = Router();

router.post('/', requireAuth, createBooking);
router.get('/me', requireAuth, myBookings);
router.get('/', requireAuth, requireAdmin, allBookings);
router.delete('/:id', requireAuth, cancelBooking);

export default router;
