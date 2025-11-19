import cors from 'cors';
import dotenv from 'dotenv';
import express, { Application, Request, Response } from 'express';

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(cors());
app.use(express.json());

// Health Check Endpoint (To verify setup)
app.get('/health', (req: Request, res: Response) => {
    res.status(200).json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Only start the server if this file is run directly (allows testing app without binding port)
if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`✅ Server running on port ${PORT}`);
    });
}

export default app;