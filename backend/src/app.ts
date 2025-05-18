import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import modelRoutes from './routes/modelRoutes';
import { defineBasicRoutes } from './routes/basics';

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Routing
defineBasicRoutes(app);
app.use('/api/models', modelRoutes);

app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Unmanaged error', err);
  res.status(500).json({ error: 'Internal Server Error'});
});

app.listen(port, () => {
  console.log(`🔥 Server running in http://localhost:${port}`);
});

export default app;