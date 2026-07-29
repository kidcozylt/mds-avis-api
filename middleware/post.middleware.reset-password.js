module.exports = (req, res, next) => {
    const { token, password } = req.body;

    if (!token || !password) {
        return res.status(400).json({ error: 'Champs manquants : token et password requis' });
    }

    if (password.length < 8) {
        return res.status(400).json({ error: 'Mot de passe trop court (8 caractères minimum)' });
    }

    next();
};