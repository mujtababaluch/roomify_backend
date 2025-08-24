import Booking from '../models/Booking.js';
import Room from '../models/Room.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { validateBookingTimes } from '../utils/validators.js';

function overlaps(aStart, aEnd, bStart, bEnd) {
  return aStart < bEnd && bStart < aEnd;
}

export const createBooking = asyncHandler(async (req, res) => {
  const { roomId, startTime, endTime, notes } = req.body;
  const err = validateBookingTimes(startTime, endTime);
  if (err) return res.status(400).json({ message: err });

  const room = await Room.findById(roomId);
  if (!room) return res.status(404).json({ message: 'Room not found' });

  const start = new Date(startTime);
  const end = new Date(endTime);

  // Check for conflicts
  const existing = await Booking.find({ room: roomId, status: 'booked' });
  const conflict = existing.find(b => overlaps(start, end, b.startTime, b.endTime));
  if (conflict) return res.status(409).json({ message: 'Time slot not available' });

  const booking = await Booking.create({
    user: req.user.id,
    room: roomId,
    startTime: start,
    endTime: end,
    notes,
  });

  const populated = await booking.populate('room').populate('user', 'name email');
  res.status(201).json({ booking: populated });
});

export const myBookings = asyncHandler(async (req, res) => {
  const bookings = await Booking.find({ user: req.user.id })
    .populate('room')
    .sort({ startTime: -1 });
  res.json({ bookings });
});

export const allBookings = asyncHandler(async (req, res) => {
  const { roomId, from, to } = req.query;
  const filter = {};
  if (roomId) filter.room = roomId;
  if (from || to) {
    filter.startTime = {};
    if (from) filter.startTime.$gte = new Date(from);
    if (to) filter.startTime.$lte = new Date(to);
  }
  const bookings = await Booking.find(filter)
    .populate('room')
    .populate('user', 'name email')
    .sort({ startTime: -1 });
  res.json({ bookings });
});

export const cancelBooking = asyncHandler(async (req, res) => {
  const booking = await Booking.findById(req.params.id);
  if (!booking) return res.status(404).json({ message: 'Booking not found' });
  const isOwner = booking.user.toString() === req.user.id;
  if (!isOwner && req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Not allowed to cancel this booking' });
  }
  booking.status = 'cancelled';
  await booking.save();
  res.json({ booking });
});
