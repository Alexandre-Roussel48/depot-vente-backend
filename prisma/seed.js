const { PrismaClient, Role, Status } = require('@prisma/client');

const { v4: uuidv4 } = require('uuid');
const { hashPassword } = require('../models/userModel');

const prisma = new PrismaClient();

async function main() {
  try {
    await cleanDatabase();
    const salt = uuidv4();
    await prisma.user.create({
      data: {
        id: 'afab4359-ceab-4e8b-a1b2-f9216c882165',
        name: 'admin',
        surname: 'admin',
        email: 'admin@depot-vente.com',
        pwd_salt: salt,
        pwd_hash: await hashPassword('admin', salt),
        role: Role.ADMIN,
      },
    });
    await prisma.game.createMany({
      data: [
        { id: 1, name: 'monopoly', editor: 'hasbro' },
        { id: 2, name: 'mario', editor: 'nintendo' },
      ],
    });
    await prisma.session.create({
      data: {
        id: 1,
        begin_date: '2024-10-01T00:00:00Z',
        end_date: '2025-10-31T23:59:59Z',
        commission: 0.1,
        fees: 5,
      },
    });
    await prisma.client.create({
      data: {
        id: '28f50080-f027-46c1-9de1-437e8a676584',
        name: 'John',
        surname: 'Doe',
        email: 'john.doe@gmail.com',
        phone_number: '0606060606',
      },
    });
    await prisma.realgame.createMany({
      data: [
        {
          unit_price: 10,
          status: Status.STOCK,
          session_id: 1,
          seller_id: '28f50080-f027-46c1-9de1-437e8a676584',
          game_id: 1,
        },
        {
          unit_price: 10,
          status: Status.STOCK,
          session_id: 1,
          seller_id: '28f50080-f027-46c1-9de1-437e8a676584',
          game_id: 1,
        },
        {
          unit_price: 10,
          status: Status.STOCK,
          session_id: 1,
          seller_id: '28f50080-f027-46c1-9de1-437e8a676584',
          game_id: 1,
        },
        {
          unit_price: 10,
          status: Status.STOCK,
          session_id: 1,
          seller_id: '28f50080-f027-46c1-9de1-437e8a676584',
          game_id: 1,
        },
        {
          unit_price: 10,
          status: Status.STOCK,
          session_id: 1,
          seller_id: '28f50080-f027-46c1-9de1-437e8a676584',
          game_id: 1,
        },
        {
          unit_price: 10,
          status: Status.STOCK,
          session_id: 1,
          seller_id: '28f50080-f027-46c1-9de1-437e8a676584',
          game_id: 1,
        },
        {
          unit_price: 10,
          status: Status.STOCK,
          session_id: 1,
          seller_id: '28f50080-f027-46c1-9de1-437e8a676584',
          game_id: 1,
        },
        {
          unit_price: 10,
          status: Status.STOCK,
          session_id: 1,
          seller_id: '28f50080-f027-46c1-9de1-437e8a676584',
          game_id: 1,
        },
        {
          unit_price: 5,
          status: Status.STOCK,
          session_id: 1,
          seller_id: '28f50080-f027-46c1-9de1-437e8a676584',
          game_id: 2,
        },
        {
          unit_price: 5,
          status: Status.STOCK,
          session_id: 1,
          seller_id: '28f50080-f027-46c1-9de1-437e8a676584',
          game_id: 2,
        },
        {
          unit_price: 5,
          status: Status.STOCK,
          session_id: 1,
          seller_id: '28f50080-f027-46c1-9de1-437e8a676584',
          game_id: 2,
        },
        {
          unit_price: 5,
          status: Status.STOCK,
          session_id: 1,
          seller_id: '28f50080-f027-46c1-9de1-437e8a676584',
          game_id: 2,
        },
        {
          unit_price: 5,
          status: Status.STOCK,
          session_id: 1,
          seller_id: '28f50080-f027-46c1-9de1-437e8a676584',
          game_id: 2,
        },
        {
          unit_price: 5,
          status: Status.STOCK,
          session_id: 1,
          seller_id: '28f50080-f027-46c1-9de1-437e8a676584',
          game_id: 2,
        },
        {
          unit_price: 5,
          status: Status.STOCK,
          session_id: 1,
          seller_id: '28f50080-f027-46c1-9de1-437e8a676584',
          game_id: 2,
        },
        {
          unit_price: 5,
          status: Status.STOCK,
          session_id: 1,
          seller_id: '28f50080-f027-46c1-9de1-437e8a676584',
          game_id: 2,
        },
        {
          unit_price: 5,
          status: Status.STOCK,
          session_id: 1,
          seller_id: '28f50080-f027-46c1-9de1-437e8a676584',
          game_id: 2,
        },
        {
          unit_price: 5,
          status: Status.STOCK,
          session_id: 1,
          seller_id: '28f50080-f027-46c1-9de1-437e8a676584',
          game_id: 2,
        },
        {
          unit_price: 5,
          status: Status.STOCK,
          session_id: 1,
          seller_id: '28f50080-f027-46c1-9de1-437e8a676584',
          game_id: 2,
        },
        {
          unit_price: 5,
          status: Status.STOCK,
          session_id: 1,
          seller_id: '28f50080-f027-46c1-9de1-437e8a676584',
          game_id: 2,
        },
        {
          unit_price: 5,
          status: Status.STOCK,
          session_id: 1,
          seller_id: '28f50080-f027-46c1-9de1-437e8a676584',
          game_id: 2,
        },
      ],
    });
    await prisma.transaction.createMany({
      data: [
        // Transactions de type DEPOSIT
        {
          date: new Date('2024-10-01T10:00:00Z'),
          value: 100.0,
          type: 'DEPOSIT',
          session_id: 1,
          seller_id: '28f50080-f027-46c1-9de1-437e8a676584',
        },
        {
          date: new Date('2024-10-02T11:00:00Z'),
          value: 50.0,
          type: 'DEPOSIT',
          session_id: 1,
          seller_id: '28f50080-f027-46c1-9de1-437e8a676584',
        },

        // Transactions de type COMMISSION
        {
          date: new Date('2024-10-03T12:00:00Z'),
          value: 10.0,
          type: 'COMMISSION',
          session_id: 1,
          seller_id: '28f50080-f027-46c1-9de1-437e8a676584',
        },
        {
          date: new Date('2024-10-04T13:00:00Z'),
          value: 15.0,
          type: 'COMMISSION',
          session_id: 1,
          seller_id: '28f50080-f027-46c1-9de1-437e8a676584',
        },

        // Transactions de type SALE
        {
          date: new Date('2024-10-05T14:00:00Z'),
          value: 20.0,
          type: 'SALE',
          session_id: 1,
          seller_id: '28f50080-f027-46c1-9de1-437e8a676584',
        },
        {
          date: new Date('2024-10-06T15:00:00Z'),
          value: 25.0,
          type: 'SALE',
          session_id: 1,
          seller_id: '28f50080-f027-46c1-9de1-437e8a676584',
        },

        // Transactions de type PAY
        {
          date: new Date('2024-10-07T16:00:00Z'),
          value: 30.0,
          type: 'PAY',
          session_id: 1,
          seller_id: '28f50080-f027-46c1-9de1-437e8a676584',
        },
        {
          date: new Date('2024-10-08T17:00:00Z'),
          value: 35.0,
          type: 'PAY',
          session_id: 1,
          seller_id: '28f50080-f027-46c1-9de1-437e8a676584',
        },
      ],
    });
    console.log('Multiple rows created successfully');
  } catch (error) {
    console.log(`Error creating rows: ${error}`);
  } finally {
    await prisma.$disconnect();
  }
}

async function cleanDatabase() {
  await prisma.transaction.deleteMany();
  await prisma.realgame.deleteMany();
  await prisma.client.deleteMany();
  await prisma.game.deleteMany();
  await prisma.session.deleteMany();
  await prisma.user.deleteMany();
}

main();
