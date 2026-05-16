const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');

// Load environment variables
dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Untuk form data

// ✅ Folder statis untuk gambar upload (penting untuk News.tsx)
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
const authRoutes = require('./routes/auth');
const requestRoutes = require('./routes/request.routes');
const informasiRoutes = require('./routes/informasi.routes');
const newsRoutes = require('./routes/news.routes');

app.use('/api/auth', authRoutes);
app.use('/api/request', requestRoutes);
app.use('/api/informasi', informasiRoutes);
app.use('/api/news', newsRoutes);

// Root route (opsional)
app.get('/', (req, res) => {
  res.send('PPID Backend API is running');
});

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch((err) => console.error('❌ MongoDB connection error:', err));

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});