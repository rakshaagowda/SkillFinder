import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function showData() {
  console.log('\n==================================================');
  console.log('       🚀 SKILLFINDER DATABASE CONTENT 🚀');
  console.log('==================================================\n');

  // 1. Users
  const users = await prisma.user.findMany({
    take: 5,
    include: { _count: { select: { enrollments: true } } }
  });

  const formattedUsers = users.map(u => ({
    ID: u.id.split('-')[0] + '...', // Truncate ID for display
    Username: u.username,
    'Password Hash': u.password.substring(0, 15) + '...', // Show it's hashed
    'Enrollments': u._count.enrollments
  }));

  console.log('👤 USERS (Top 5)');
  console.table(formattedUsers);
  console.log('--------------------------------------------------\n');

  // 2. Platforms
  const platforms = await prisma.platform.findMany({
    take: 5,
    select: { name: true, type: true, rating: true, categories: true }
  });

  const formattedPlatforms = platforms.map(p => ({
    Name: p.name,
    Type: p.type.toUpperCase(),
    Rating: p.rating,
    Categories: JSON.parse(p.categories).join(', ')
  }));

  console.log('📚 PLATFORMS / COURSES (Top 5)');
  console.table(formattedPlatforms);
  console.log('--------------------------------------------------\n');

  // 3. Enrollments
  const enrollments = await prisma.enrollment.findMany({
    take: 5,
    include: {
      user: { select: { username: true } },
      platform: { select: { name: true } }
    }
  });

  const formattedEnrollments = enrollments.map(e => ({
    'Enrollment ID': e.id.split('-')[0] + '...',
    'User': e.user.username,
    'Course': e.platform.name,
    'Date': new Date(e.enrolledAt).toLocaleDateString()
  }));

  console.log('🔗 ENROLLMENTS (Recent 5)');
  if (formattedEnrollments.length > 0) {
    console.table(formattedEnrollments);
  } else {
    console.log('No enrollments found yet.');
  }
  console.log('==================================================\n');
}

showData()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
