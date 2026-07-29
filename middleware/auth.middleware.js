const { verifyJwt } = require("../lib/jwt"); 

module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Authentification requise' });
    }

    const token = authHeader.split(' ')[1];
    const decoded = verifyJwt(token);

    if (!decoded) {
        return res.status(401).json({ error: 'Jeton invalide ou expiré' });
    }

    req.user = decoded;
    next();
};