const prisma = require('../lib/prisma');
const argon2 = require('argon2');

module.exports = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const existingUser = await prisma.user.findUnique({
            where: { email }
        });

        if (existingUser) {
            return res.status(409).json({ error: 'Email déjà utilisé' });
        }

        const hashedPassword = await argon2.hash(password);

        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword
            }
        });

        return res.status(201).json({ message: 'Compte créé avec succès', user });

    } catch (error) {
        console.error('Erreur POST /register :', error);
        return res.status(500).json({ error: 'Erreur serveur' });
    }
};