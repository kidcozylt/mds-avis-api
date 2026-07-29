const prisma = require('../lib/prisma');

module.exports = async (req, res, next) => {
    const prisma = require('../lib/prisma');
const argon2 = require('argon2');

module.exports = async (req, res) => {
    const { token, password } = req.body;

    try {
        const user = await prisma.user.findFirst({
            where: {
                resetToken: token,
                resetTokenExpiry: { gt: new Date() }
            }
        });

        if (!user) {
            return res.status(400).json({ error: 'Token invalide ou expiré' });
        }

        const hashedPassword = await argon2.hash(password);

        await prisma.user.update({
            where: { id: user.id },
            data: {
                password: hashedPassword,
                resetToken: null,
                resetTokenExpiry: null
            }
        });

        return res.json({ message: 'Mot de passe réinitialisé avec succès' });

    } catch (error) {
        console.error('Erreur POST /reset-password :', error);
        return res.status(500).json({ error: 'Erreur serveur' });
    }
};
};