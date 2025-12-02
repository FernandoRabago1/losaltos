import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import * as readline from 'readline';

const prisma = new PrismaClient();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function question(query: string): Promise<string> {
  return new Promise((resolve) => {
    rl.question(query, resolve);
  });
}

async function changePassword() {
  try {
    console.log('\n🔐 Cambiar Contraseña de Administrador\n');

    // Get user email
    const email = await question('Email del administrador: ');

    // Find user
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      console.log('❌ Usuario no encontrado');
      process.exit(1);
    }

    console.log(`✓ Usuario encontrado: ${user.name} (${user.email})`);

    // Get new password
    const newPassword = await question('\nNueva contraseña (mínimo 6 caracteres): ');

    if (newPassword.length < 6) {
      console.log('❌ La contraseña debe tener al menos 6 caracteres');
      process.exit(1);
    }

    // Confirm password
    const confirmPassword = await question('Confirmar nueva contraseña: ');

    if (newPassword !== confirmPassword) {
      console.log('❌ Las contraseñas no coinciden');
      process.exit(1);
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update password
    await prisma.user.update({
      where: { email },
      data: { password: hashedPassword },
    });

    console.log('\n✅ Contraseña actualizada exitosamente!\n');
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await prisma.$disconnect();
    rl.close();
  }
}

changePassword();
