const { PrismaClient } = require('@prisma/client');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const prisma = new PrismaClient();

async function getUserByEmail(data) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: data,
      },
    });

    return user; // Renvoie l'utilisateur trouvé ou null s'il n'existe pas
  } catch (error) {
    throw new Error(`Error getting user : ${error.message}`);
  }
}

//user: utilisateur de la db; data: utilisateur qui tente de se connecter
async function comparePasswords(user, data) {
  try {
    const isPasswordValid = await bcrypt.compare(data.password, user.pwd_hash); // Corrected this line

    console.log(`Password is ${!isPasswordValid ? 'not' : ''} valid!`);

    return isPasswordValid; // Return true if passwords match, false otherwise
  } catch (error) {
    throw new Error(`Error comparing passwords: ${error.message}`);
  }
}

async function hashPassword(password, salt) {
  try {
    return await bcrypt.hash(password + salt, 10);
  } catch (error) {
    throw new Error(`Error creating passwords: ${error.message}`);
  }
}

async function createJwt(user) {
  try {
    return jwt.sign(
      {
        id: user.id,
        name: user.name,
        surname: user.surname,
        email: user.email,
        role: user.role,
      },
      process.env.SECRET_KEY,
      { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
    ); // Expires in 1 hour
  } catch (error) {
    console.log(`Error creating Jwt : ${error.message}`);
  }
}

module.exports = {
  getUserByEmail,
  comparePasswords,
  hashPassword,
  createJwt,
};
