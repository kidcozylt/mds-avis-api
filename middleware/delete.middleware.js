module.exports = (req, res, next) => {
    const id = parseInt(req.params.id);

    if (!req.params.id) {
        return res.status(400).json({ error: 'ID manquant' });
    }

    if (isNaN(id)) {
        return res.status(400).json({ error: 'ID invalide' });
    }

    req.params.id = id;
    next();
};