const { PrismaClient, Role, Status } = require('@prisma/client');

const { v4: uuidv4 } = require('uuid');
const { hashPassword } = require('../models/userModel');

const prisma = new PrismaClient();

async function main() {
  try {
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
        commission: 10,
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
    console.log('Multiple rows created successfully');
  } catch (error) {
    console.log(`Error creating rows: ${error}`);
  } finally {
    await prisma.$disconnect();
  }
}

main();
