import Room from '../models/Room.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const listRooms = asyncHandler(async (req, res) => {
  const { capacity, q } = req.query;
  const filter = { isActive: true };
  if (capacity) filter.capacity = { $gte: Number(capacity) };
  if (q) filter.$or = [
    { name: { $regex: q, $options: 'i' } },
    { description: { $regex: q, $options: 'i' } },
    { location: { $regex: q, $options: 'i' } },
  ];
  const rooms = await Room.find(filter).sort({ createdAt: -1 });
  res.json({ rooms });
});

export const getRoom = asyncHandler(async (req, res) => {
  const room = await Room.findById(req.params.id);
  if (!room) return res.status(404).json({ message: 'Room not found' });
  res.json({ room });
});

export const createRoom = asyncHandler(async (req, res) => {
  const { name, description, capacity, location, amenities, imageUrl, isActive } = req.body;
  const room = await Room.create({ name, description, capacity, location, amenities, imageUrl, isActive });
  res.status(201).json({ room });
});

export const updateRoom = asyncHandler(async (req, res) => {
  const room = await Room.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!room) return res.status(404).json({ message: 'Room not found' });
  res.json({ room });
});

export const deleteRoom = asyncHandler(async (req, res) => {
  const room = await Room.findByIdAndDelete(req.params.id);
  if (!room) return res.status(404).json({ message: 'Room not found' });
  res.json({ message: 'Room deleted' });
});
