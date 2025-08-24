import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  room: { type: mongoose.Schema.Types.ObjectId, ref: 'Room', required: true },
  startTime: { type: Date, required: true },
  endTime: { type: Date, required: true },
  status: { type: String, enum: ['booked', 'cancelled'], default: 'booked' },
  notes: { type: String }
}, { timestamps: true });

bookingSchema.index({ room: 1, startTime: 1, endTime: 1 });

const Booking = mongoose.model('Booking', bookingSchema);
export default Booking;
