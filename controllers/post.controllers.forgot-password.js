const prisma = require('../lib/prisma');
const { sendEmail } = require('../lib/nodemailer');
const crypto = require('crypto');

module.exports = async (req, res) => {
    const { email } = req.body;

    try {
        const user = await prisma.user.findUnique({
            where: { email }
        });

        if (!user) {
            return res.status(404).json({ error: 'Utilisateur non trouvé' });
        }

        const token = crypto.randomBytes(32).toString('hex');
        const expiry = new Date(Date.now() + 1000 * 60 * 60); 

        await prisma.user.update({
            where: { email },
            data: {
                resetToken: token,
                resetTokenExpiry: expiry
            }
        });

        await sendEmail(
            email,
            'Réinitialisation de mot de passe',
            `Ton token de réinitialisation : ${token}\n\nUtilise-le dans POST /reset-password avec ce token et ton nouveau mot de passe.\n\nExpire dans 1 heure.`
        );

        return res.json({ message: 'Email envoyé', token });

    } catch (error) {
        console.error('Erreur POST /forgot-password :', error);
        return res.status(500).json({ error: 'Erreur serveur' });
    }
};