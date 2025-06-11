import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(cors());
app.use(express.json());

// Basic health check route
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Digital Scribe Server is running!' });
});

// API routes placeholder
app.get('/api/v1', (req, res) => {
  res.json({ message: 'Digital Scribe API v1', version: '1.0.0' });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
  console.log(`📚 Digital Scribe API v1 available at http://localhost:${PORT}/api/v1`);
});