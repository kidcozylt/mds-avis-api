module.exports = (req, res, next) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ error: 'Champs manquants : name, email, password requis' });
    }

    if (typeof email !== 'string' || !email.includes('@')) {
        return res.status(400).json({ error: 'Email invalide' });
    }

    if (password.length < 8) {
        return res.status(400).json({ error: 'Mot de passe trop court (8 caractères minimum)' });
    }

    next();
};