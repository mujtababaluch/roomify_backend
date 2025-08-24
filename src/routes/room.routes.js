import { Router } from 'express';
import { listRooms, getRoom, createRoom, updateRoom, deleteRoom } from '../controllers/room.controller.js';
import { requireAuth, requireAdmin } from '../middleware/auth.js';

const router = Router();

router.get('/', listRooms);
router.get('/:id', getRoom);

// Admin-only
router.post('/', requireAuth, requireAdmin, createRoom);
router.patch('/:id', requireAuth, requireAdmin, updateRoom);
router.delete('/:id', requireAuth, requireAdmin, deleteRoom);

export default router;
