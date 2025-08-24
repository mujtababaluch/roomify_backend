import 'dotenv/config';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import User from '../src/models/User.js';
import Room from '../src/models/Room.js';

async function run() {
  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error('MONGODB_URI is not set');
  await mongoose.connect(uri);
  console.log('Connected to MongoDB');

  // Clear
  await Promise.all([User.deleteMany({}), Room.deleteMany({})]);

  // Create admin
  const admin = new User({
    name: 'Admin',
    email: 'admin@roomify.local',
    password: 'admin123',
    role: 'admin',
  });
  const salt = await bcrypt.genSalt(10);
  admin.password = await bcrypt.hash(admin.password, salt);
  await admin.save();
  console.log('Admin created: admin@roomify.local / admin123');

  // Create sample hotel rooms
  const rooms = await Room.insertMany([
    {
      name: 'Deluxe King Room',
      description: 'Spacious room with a king-size bed, city view, and private balcony.',
      capacity: 2,
      location: '2nd Floor',
      amenities: ['WiFi', 'Air Conditioning', 'Balcony', 'Mini Bar'],
      imageUrl: 'https://picsum.photos/seed/room1/600/400',
    },
    {
      name: 'Standard Double Room',
      description: 'Cozy double room perfect for couples or small families.',
      capacity: 2,
      location: '1st Floor',
      amenities: ['WiFi', 'TV', 'Room Service'],
      imageUrl: 'https://picsum.photos/seed/room2/600/400',
    },
    {
      name: 'Executive Suite',
      description: 'Luxury suite with separate living room and workspace.',
      capacity: 3,
      location: '5th Floor',
      amenities: ['WiFi', 'Workspace', 'Mini Bar', 'Jacuzzi'],
      imageUrl: 'https://picsum.photos/seed/room3/600/400',
    },
    {
      name: 'Family Room',
      description: 'Large family-friendly room with two double beds.',
      capacity: 4,
      location: '3rd Floor',
      amenities: ['WiFi', 'Air Conditioning', 'Kids Play Area Access'],
      imageUrl: 'https://picsum.photos/seed/room4/600/400',
    },
    {
      name: 'Penthouse Suite',
      description: 'Top floor luxury suite with panoramic views of the city.',
      capacity: 2,
      location: '10th Floor',
      amenities: ['WiFi', 'Private Pool', 'Jacuzzi', 'Butler Service'],
      imageUrl: 'https://picsum.photos/seed/room5/600/400',
    },
    {
      name: 'Single Economy Room',
      description: 'Affordable single room with basic amenities.',
      capacity: 1,
      location: 'Ground Floor',
      amenities: ['WiFi', 'Fan'],
      imageUrl: 'https://picsum.photos/seed/room6/600/400',
    },
    {
      name: 'Twin Bed Room',
      description: 'Comfortable twin room for friends or colleagues.',
      capacity: 2,
      location: '4th Floor',
      amenities: ['WiFi', 'Air Conditioning', 'TV'],
      imageUrl: 'https://picsum.photos/seed/room7/600/400',
    },
    {
      name: 'Luxury Villa',
      description: 'Private villa with garden, pool, and exclusive services.',
      capacity: 6,
      location: 'Private Wing',
      amenities: ['Private Pool', 'Garden', 'Kitchen', 'WiFi'],
      imageUrl: 'https://picsum.photos/seed/room8/600/400',
    },
    {
      name: 'Studio Room',
      description: 'Modern studio apartment with kitchenette.',
      capacity: 2,
      location: '6th Floor',
      amenities: ['WiFi', 'Kitchenette', 'Workspace'],
      imageUrl: 'https://picsum.photos/seed/room9/600/400',
    },
    {
      name: 'Honeymoon Suite',
      description: 'Romantic suite with jacuzzi and candlelight dinner service.',
      capacity: 2,
      location: '7th Floor',
      amenities: ['Jacuzzi', 'WiFi', 'Private Dining', 'Balcony'],
      imageUrl: 'https://picsum.photos/seed/room10/600/400',
    },
  ]);

  console.log(`Seeded ${rooms.length} hotel rooms`);

  await mongoose.disconnect();
  console.log('Done.');
}

run().catch(e => { console.error(e); process.exit(1); });

