const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  try {
    await prisma.game.createMany({
      data: [
        { name: 'Monopoly', editor: 'Hasbro' },
        { name: 'Mario', editor: 'Nintendo' },
      ],
    });
    console.log('Multiple rows created successfully');
  } catch {
    console.log('Multiple rows already created');
  } finally {
    await prisma.$disconnect();
  }
}

main();
