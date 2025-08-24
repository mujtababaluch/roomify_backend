import mongoose from 'mongoose';

const roomSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  capacity: { type: Number, default: 1 },
  location: { type: String },
  amenities: [{ type: String }],
  imageUrl: { type: String },
  isActive: { type: Boolean, default: true },
}, { timestamps: true });

const Room = mongoose.model('Room', roomSchema);
export default Room;
