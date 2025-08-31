const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const authRoutes = require('./routes/auth');

require('dotenv').config();

const app = express();

// Connect to MongoDB
connectDB();

// CORS Middleware
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000'],
  credentials: true
}));

// Middleware
app.use(express.json());  // ✅ removed { extended: false }

// Basic test route
app.get('/', (req, res) => {
  res.json({ message: 'DevConnector API is running!' });
});

// Test route to check CORS
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Import and use routes (uncomment when ready)
app.use('/api/auth', require('./routes/auth'));
// app.use('/api/profile', require('./routes/profiles'));
// app.use('/api/users', require('./routes/users'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
