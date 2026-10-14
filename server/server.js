
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const app = express();

app.use(
  cors({
    origin: (process.env.CLIENT_URL || 'http://localhost:5173')
      .split(',')
      .map((url) => url.trim()),
    credentials: true,
  })
);

app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'JWT Auth API running',
  });
});

app.use('/api/auth', require('./routes/auth'));

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
  });
});

// Vercel serverless function
let dbConnectionPromise;

async function handler(req, res) {
  try {
    if (!dbConnectionPromise) {
      dbConnectionPromise = connectDB().catch((error) => {
        dbConnectionPromise = null;
        throw error;
      });
    }

    await dbConnectionPromise;
    return app(req, res);
  } catch (error) {
    console.error('Database connection failed:', error);
    return res.status(500).json({
      success: false,
      message: 'Database connection failed',
    });
  }
}

module.exports = handler;

// Local development
if (require.main === module) {
  const PORT = process.env.PORT || 5000;

  handler.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}
