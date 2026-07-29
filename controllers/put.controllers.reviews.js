const prisma = require('../lib/prisma');

module.exports = async (req, res) => {
    try {
        const { id } = req.params; // déjà parsé en Int par put.middleware

        const review = await prisma.review.findUnique({ where: { id } });

        if (!review) {
            return res.status(404).json({ error: 'Avis introuvable' });
        }

        if (review.userId !== req.user.id) {
            return res.status(403).json({ error: 'Tu ne peux modifier que tes propres avis' });
        }

        const { rating, description } = req.body;

        if (rating !== undefined && (rating < 1 || rating > 5)) {
            return res.status(400).json({ error: 'La note doit être comprise entre 1 et 5' });
        }

        if (description !== undefined && description.trim().length === 0) {
            return res.status(400).json({ error: 'La description ne peut pas être vide' });
        }

        const updatedReview = await prisma.review.update({
            where: { id },
            data: {
                ...(rating !== undefined && { rating }),
                ...(description !== undefined && { description }),
            }
        });

        return res.json(updatedReview);
    } catch (error) {
        console.error('Erreur PUT /avis/:id :', error);
        return res.status(500).json({ error: 'Erreur serveur' });
    }
};