import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const email = 'admin@example.com'; // Change this to your admin email
  const newPassword = 'admin123'; // Change this to your desired password

  console.log('Resetting password for:', email);

  // Hash the new password
  const hashedPassword = await bcrypt.hash(newPassword, 10);

  // Check if user exists
  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    // Update existing user
    await prisma.user.update({
      where: { email },
      data: {
        password: hashedPassword,
      },
    });
    console.log('✓ Password updated successfully!');
  } else {
    // Create new admin user
    await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name: 'Admin',
        role: 'ADMIN',
      },
    });
    console.log('✓ Admin user created successfully!');
  }

  console.log('\nLogin credentials:');
  console.log('Email:', email);
  console.log('Password:', newPassword);
  console.log('\nPlease change the password after first login!');
}

main()
  .catch((e) => {
    console.error('Error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
