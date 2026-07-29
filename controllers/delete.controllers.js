const prisma = require("../lib/prisma");

module.exports = async (req, res) => {
    try {
        const { id } = req.params; 

        const review = await prisma.review.findUnique({ where: { id } });

        if (!review) {
            return res.status(404).json({ error: 'Avis introuvable' });
        }

        if (review.userId !== req.user.id) {
            return res.status(403).json({ error: 'Tu ne peux supprimer que tes propres avis' });
        }

        const deletedReview = await prisma.review.delete({ where: { id } });

        return res.json({ message: 'Avis supprimé avec succès', review: deletedReview });
    } catch (error) {
        console.error('Erreur DELETE /avis/:id :', error);
        return res.status(500).json({ error: 'Erreur serveur' });
    }
};