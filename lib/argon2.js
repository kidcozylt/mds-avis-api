const argon2 = require('argon2')

/**
 * hashPassword — Hache un mot de passe en clair.
 *
 * @param {string} password  Le mot de passe saisi par l'utilisateur.
 * @returns {Promise<string>} Le hash à stocker en base de données.
 * */

const hashPassword = async (password) => {
  try { const hash = await argon2.hash(password)
    return hash
  } catch (err) { 
    console.error('Error hashing password:', err)
    // On relance l'erreur (throw) pour que la fonction appelante puisse la gérer.
    throw err
  }
}
 
const verifyPassword = async (password, hash) => {
  try {  const isValid = await argon2.verify(hash, password)
    return isValid
  } catch (err) { 
    console.error('Error verifying password:', err)
    throw err
  }
}


module.exports = {
  hashPassword,
  verifyPassword
}
