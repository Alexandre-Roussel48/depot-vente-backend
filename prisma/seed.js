const { PrismaClient, Role } = require('@prisma/client');

const { v4: uuidv4 } = require('uuid');
const { hashPassword } = require('../models/userModel');

const prisma = new PrismaClient();

async function main() {
  try {
    const salt = uuidv4();
    await prisma.user.create({
      data: {
        name: 'admin',
        surname: 'admin',
        email: 'admin@depot-vente.com',
        pwd_salt: salt,
        pwd_hash: await hashPassword('admin', salt),
        role: Role.ADMIN,
      }
    });
    await prisma.game.createMany({
      data: [
        { name: 'Monopoly', editor: 'Hasbro' },
        { name: 'Mario', editor: 'Nintendo' },
      ]
    });
    console.log('Multiple rows created successfully');
  } catch {
    console.log('Multiple rows already created');
  } finally {
    await prisma.$disconnect();
  }
}

main();
