import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function verifyDatabase() {
  console.log('--- Starting Database Verification ---');

  // 1. Verify User Creation and Password Hashing
  const testUsername = 'verify_user_' + Date.now();
  const testPassword = 'securepassword123';

  console.log(`\n1. Creating test user: ${testUsername}`);
  const hashedPassword = await bcrypt.hash(testPassword, 10);

  const user = await prisma.user.create({
    data: {
      username: testUsername,
      password: hashedPassword,
    },
  });

  console.log('User created successfully.');
  console.log(`User ID: ${user.id}`);
  console.log(`Stored Password Hash: ${user.password}`);

  const isPasswordMatch = await bcrypt.compare(testPassword, user.password);
  console.log(`Password Verification (bcrypt.compare): ${isPasswordMatch ? 'SUCCESS' : 'FAILED'}`);

  if (!user.password.startsWith('$2')) {
    console.error('WARNING: Password does not look like a bcrypt hash!');
  } else {
    console.log('Password format looks correct (bcrypt).');
  }

  // 2. Verify Enrollment Persistence
  console.log('\n2. Verifying Enrollment Persistence');

  // Get a random platform
  const platform = await prisma.platform.findFirst();
  if (!platform) {
    console.error('No platforms found in database. Cannot test enrollment.');
    return;
  }
  console.log(`Enrolling user in platform: ${platform.name} (ID: ${platform.id})`);

  const enrollment = await prisma.enrollment.create({
    data: {
      userId: user.id,
      platformId: platform.id,
    },
  });

  console.log('Enrollment created successfully.');
  console.log(`Enrollment ID: ${enrollment.id}`);

  // Fetch user with enrollments
  const userWithEnrollments = await prisma.user.findUnique({
    where: { id: user.id },
    include: {
      enrollments: {
        include: {
          platform: true
        }
      }
    }
  });

  console.log(`\nFetching user data for verification...`);
  if (userWithEnrollments.enrollments.length > 0) {
    console.log(`User has ${userWithEnrollments.enrollments.length} enrollment(s).`);
    console.log(`Enrolled Course: ${userWithEnrollments.enrollments[0].platform.name}`);
    console.log('Enrollment Verification: SUCCESS');
  } else {
    console.error('Enrollment Verification: FAILED - No enrollments found for user.');
  }

  // Cleanup
  console.log('\nCleaning up test data...');
  await prisma.enrollment.deleteMany({ where: { userId: user.id } });
  await prisma.user.delete({ where: { id: user.id } });
  console.log('Cleanup complete.');
}

verifyDatabase()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
