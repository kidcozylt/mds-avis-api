module.exports = (req, res, next) => {
    if (req.query.toto === 'true') {
        return res.status(403).json({ message: 'Accès interdit' });
    }
    next();
};