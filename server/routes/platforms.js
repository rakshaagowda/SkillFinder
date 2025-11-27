import express from 'express';
import { PrismaClient } from '@prisma/client';

const router = express.Router();
const prisma = new PrismaClient();

// Get platforms with filtering
router.get('/', async (req, res) => {
  try {
    const { search, category, mode, language, location } = req.query;

    // Fetch all (since filtering JSON fields in SQLite/Prisma is limited)
    const platforms = await prisma.platform.findMany();

    // Parse JSON strings
    let formattedPlatforms = platforms.map(p => ({
      ...p,
      categories: JSON.parse(p.categories),
      languages: JSON.parse(p.languages),
      location: p.location ? JSON.parse(p.location) : null,
    }));

    // Filter in memory
    if (search) {
      const q = search.toLowerCase();
      formattedPlatforms = formattedPlatforms.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.topCourse?.toLowerCase().includes(q) ||
        p.categories.some(c => c.toLowerCase().includes(q))
      );
    }

    if (category && category !== 'all') {
      formattedPlatforms = formattedPlatforms.filter(p => p.categories.includes(category));
    }

    if (mode && mode !== 'both') {
      formattedPlatforms = formattedPlatforms.filter(p => p.type === mode);
    }

    if (language && language !== 'any') {
      formattedPlatforms = formattedPlatforms.filter(p => p.languages.includes(language));
    }

    if (location) {
      const locQ = location.toLowerCase();
      formattedPlatforms = formattedPlatforms.filter(p =>
        p.location && p.location.city.toLowerCase().includes(locQ)
      );
    }

    res.json(formattedPlatforms);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching platforms' });
  }
});

export default router;
