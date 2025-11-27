import express from 'express';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';

const router = express.Router();
const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || 'supersecretkey';

// Middleware to authenticate user
const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: 'No token provided' });

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
};

// Get my enrollments
router.get('/', authenticate, async (req, res) => {
  try {
    const enrollments = await prisma.enrollment.findMany({
      where: { userId: req.userId },
      include: { platform: true },
    });

    // Format platforms (parse JSON fields)
    const formattedEnrollments = enrollments.map(e => ({
      ...e,
      platform: {
        ...e.platform,
        categories: JSON.parse(e.platform.categories),
        languages: JSON.parse(e.platform.languages),
        location: e.platform.location ? JSON.parse(e.platform.location) : null,
      }
    }));

    res.json(formattedEnrollments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching enrollments' });
  }
});

// Enroll in a platform
router.post('/', authenticate, async (req, res) => {
  const { platformId } = req.body;

  if (!platformId) {
    return res.status(400).json({ error: 'Platform ID is required' });
  }

  try {
    const enrollment = await prisma.enrollment.create({
      data: {
        userId: req.userId,
        platformId,
      },
    });
    res.json(enrollment);
  } catch (error) {
    // Check for unique constraint violation (already enrolled)
    if (error.code === 'P2002') {
      return res.status(400).json({ error: 'Already enrolled in this course' });
    }
    console.error(error);
    res.status(500).json({ error: 'Error enrolling in course' });
  }
});

export default router;
