const jsonwebtoken = require("jsonwebtoken");

/**
 * signJwt — Crée (signe) un nouveau jeton JWT.
 *
 * @param {Object} payload  Les données à mettre dans le jeton (ex : { email }).
 * @returns {string}        Le jeton signé, sous forme de chaîne de caractères.
 *
 * `expiresIn: "1h"` : le jeton expire automatiquement au bout d'une heure.
 * Doc : https://github.com/auth0/node-jsonwebtoken#jwtsignpayload-secretorprivatekey-options-callback
 */
const signJwt = (payload) => {
    return jsonwebtoken.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "1h"
    });
}

/**
 * verifyJwt — Vérifie et décode un jeton JWT.
 *
 * @param {string} token  Le jeton reçu du client.
 * @returns {Object|null} Le contenu (payload) si le jeton est valide,
 *                        sinon `null` (jeton expiré, modifié ou invalide).
 *
 * `jwt.verify` lève une erreur si le jeton est invalide : on l'attrape avec
 * try/catch pour renvoyer `null` plutôt que de planter l'application.
 * Doc : https://github.com/auth0/node-jsonwebtoken#jwtverifytoken-secretorpublickey-options-callback
 */
const verifyJwt = (token) => {
    try {
        return jsonwebtoken.verify(token, process.env.JWT_SECRET);
    } catch (error) {
        console.error("Erreur lors de la vérification du JWT :", error);
        return null;
    }
}

// On exporte les deux fonctions pour les utiliser ailleurs (login, middleware...).
module.exports = {
    signJwt,
    verifyJwt
}