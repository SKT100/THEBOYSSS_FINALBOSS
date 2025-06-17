import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  fullName: String,
  username: String,
  email: { type: String, unique: true },
  phone: String,
  password: String,
  bio: String
});

export default mongoose.model('User', userSchema);
