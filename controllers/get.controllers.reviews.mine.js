const prisma = require("../lib/prisma");
 
module.exports = async (req, res) => {
    try {
        const reviews = await prisma.review.findMany({
            where: { userId: req.user.id },
            orderBy: { date: 'desc' }
        });
 
        return res.json(reviews);
    } catch (error) {
        console.error('Erreur GET /mes-avis :', error);
        return res.status(500).json({ error: 'Erreur serveur' });
    }
};