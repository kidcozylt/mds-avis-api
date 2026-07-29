const prisma = require('../lib/prisma');
const argon2 = require('argon2');
const jwt = require('jsonwebtoken');

module.exports = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await prisma.user.findUnique({
            where: { email }
        });

        if (!user) {
            return res.status(404).json({ error: 'Utilisateur non trouvé' });
        }

        const validPassword = await argon2.verify(user.password, password);

        if (!validPassword) {
            return res.status(401).json({ error: 'Mot de passe incorrect' });
        }

        const token = jwt.sign(
            { id: user.id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        return res.json({
            message: 'Connexion réussie',
            user: { id: user.id, name: user.name, email: user.email },
            jwt: token
        });

    } catch (error) {
        console.error('Erreur POST /login :', error);
        return res.status(500).json({ error: 'Erreur serveur' });
    }
};