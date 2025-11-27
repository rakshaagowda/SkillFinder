import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import platformRoutes from './routes/platforms.js';
import enrollmentRoutes from './routes/enrollments.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/platforms', platformRoutes);
app.use('/api/enrollments', enrollmentRoutes);

app.get('/', (req, res) => {
  res.send('SkillFinder API is running');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
