import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { translateText } from './controllers/translationController';
import learnRoutes from './routes/learnRoutes'; // Import learn routes

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

// --- Database Connection (to be implemented) ---
// import connectDB from './config/db';
// connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Basic health check route
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Digital Scribe Server is running!' });
});

// API v1 Router
const apiV1Router = express.Router();

// API v1 base route
apiV1Router.get('/', (req, res) => {
  res.json({ message: 'Digital Scribe API v1', version: '1.0.0' });
});

// Translation endpoint
apiV1Router.post('/translate', translateText);

// Mount the new "Learn" routes
apiV1Router.use('/learn', learnRoutes);

// Mount API v1 router
app.use('/api/v1', apiV1Router);

// Error handling middleware
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('[Server] Error:', err.stack);
  res.status(500).json({
    error: 'Internal Server Error',
    message: 'An unexpected error occurred'
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    error: 'Not Found',
    message: `Route ${req.originalUrl} not found`
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
  console.log(`📚 Digital Scribe API v1 available at http://localhost:${PORT}/api/v1`);
  console.log(`🔤 Translation endpoint: POST http://localhost:${PORT}/api/v1/translate`);
});