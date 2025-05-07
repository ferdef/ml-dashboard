import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { defineBasicRoutes } from './routes/basics';

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Routing
defineBasicRoutes(app);

app.listen(port, () => {
  console.log(`🔥 Server running in http://localhost:${port}`);
});

export default app;