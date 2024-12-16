const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

/*========*/
/* CLIENT */
/*========*/

/*********
 * CREATE *
 *********/

/* Creates a new client
 * Pre-requisites : new client email and/or phone number doesn't already exists
 * Params :
 * - data : dict with :
 *   - name : string
 *   - surname : string
 *   - email : string (unique)
 *   - phone_number : string (unique)
 *   - address : string?
 */
async function createClient(data) {
  try {
    await prisma.client.create({
      data: {
        name: data.name.toLowerCase(),
        surname: data.surname.toLowerCase(),
        email: data.email.toLowerCase(),
        phone_number: data.phone_number,
        ...(data.address && { address: data.address.toLowerCase() }),
      },
    });
  } catch (error) {
    throw new Error(
      `Erreur serveur lors de la création d'un client: ${error.message}`
    );
  }
}

/*********
 * UPDATE *
 *********/

/* Updates an existing client
 * Params :
 * - data : dict with :
 *   - name : string?
 *   - surname : string?
 *   - email : string? (unique)
 *   - phone_number : string? (unique)
 *   - address : string?
 */
async function updateClient(data) {
  try {
    await prisma.client.update({
      where: { id: data.id },
      data: {
        ...(data.name && { name: data.name.toLowerCase() }), // Include only if name exists
        ...(data.surname && { surname: data.surname.toLowerCase() }), // Include only if surname exists
        ...(data.email && { email: data.email.toLowerCase() }), // Include only if email exists
        ...(data.phone_number && { phone_number: data.phone_number }), // Include only if phone_number exists
        ...(data.address && { address: data.address.toLowerCase() }), // Include only if address exists
      },
    });
  } catch (error) {
    throw new Error(
      `Erreur serveur lors de la mise à jour d'un client: ${error.message}`
    );
  }
}

/*********
 * DELETE *
 *********/

/* Deletes existing client
 * Params :
 * - data : dict with :
 *   - id : string
 */
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

/**********
 * GETTERS *
 **********/

/* Returns existing client
 * Params :
 * - id : Number
 */
async function getClientById(client_id) {
  try {
    const client = await prisma.client.findUnique({
      where: {
        id: client_id,
      },
    });
    return client;
  } catch (error) {
    throw new Error(
      `Erreur serveur lors de la récupération du client avec son id: ${error.message}`
    );
  }
}

/* Returns existing client
 * Params :
 * - email : string
 */
async function getClientByEmail(email) {
  try {
    const client = await prisma.client.findUnique({
      where: {
        email: email,
      },
    });
    return client;
  } catch (error) {
    throw new Error(
      `Erreur serveur lors de la récupération du client avec son mail: ${error.message}`
    );
  }
}

async function getClientsByStartEmail(emailPrefix) {
  try {
    if (emailPrefix && typeof emailPrefix !== 'string') {
      throw new Error('emailPrefix doit être une chaîne de caractères');
    }

    const clients = await prisma.client.findMany({
      where: emailPrefix
        ? {
            email: {
              startsWith: emailPrefix.toLowerCase(),
            },
          }
        : {}, // Si emailPrefix est vide, aucun filtre n'est appliqué
    });
    return clients;
  } catch (error) {
    throw new Error(
      `Erreur serveur lors de la récupération des clients avec le début du mail: ${error.message}`
    );
  }
}

module.exports = {
  createClient,
  updateClient,
  deleteClient,
  getClientById,
  getClientByEmail,
  getClientsByStartEmail,
};
