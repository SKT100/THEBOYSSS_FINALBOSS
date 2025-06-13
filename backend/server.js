const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user'); // must come AFTER express() is declared

const app = express(); // ✅ this must come BEFORE any app.use()

app.use(cors());
app.use(express.json());

app.use('/api', authRoutes);
app.use('/api/user', userRoutes); // ✅ now it's safe to use

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch((err) => console.error('MongoDB connection error:', err));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
