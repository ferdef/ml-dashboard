import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    message: 'ML Dashboard API'
  });
});

app.listen(port, () => {
  console.log(`🔥 Servidor corriendo en http://localhost:${port}`);
});

export default app;