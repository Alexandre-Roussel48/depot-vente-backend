const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function getClient(data) {
  try {
    const clients = await prisma.client.findMany({
      where: data.id ? { id: data.id } : {}, // If data.id exists, filter by id; otherwise, return all clients
    });
    return clients;
  } catch (error) {
    throw new Error(
      `Erreur serveur lors de la récupération des clients: ${error.message}`
    );
  }
}

async function createClient(data) {
  try {
    await prisma.client.create({
      data: {
        name: data.name,
        surname: data.surname,
        email: data.email,
        phone_number: data.phone_number,
        ...(data.address && { address: data.address }),
      },
    });
  } catch (error) {
    throw new Error(
      `Erreur serveur lors de la création d'un client: ${error.message}`
    );
  }
}

async function updateClient(data) {
  try {
    await prisma.client.update({
      where: { id: data.id },
      data: {
        ...(data.name && { name: data.name }), // Include only if name exists
        ...(data.surname && { surname: data.surname }), // Include only if surname exists
        ...(data.email && { email: data.email }), // Include only if email exists
        ...(data.phone_number && { phone_number: data.phone_number }), // Include only if phone_number exists
        ...(data.address && { address: data.address }), // Include only if address exists
      },
    });
  } catch (error) {
    throw new Error(
      `Erreur serveur lors de la mise à jour d'un client: ${error.message}`
    );
  }
}

async function deleteClient(data) {
  try {
    await prisma.client.delete({
      where: { id: data.id },
    });
  } catch (error) {
    throw new Error(
      `Erreur serveur lors de la suppression d'un client: ${error.message}`
    );
  }
}

module.exports = {
  getClient,
  createClient,
  updateClient,
  deleteClient,
};
