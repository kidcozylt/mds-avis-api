const prisma = require('../lib/prisma');

module.exports = async (req, res) => {
    const { identite, description, rating, name } = req.body;

    if (!identite || !description || !rating) {
        return res.status(400).json({ error: 'identite, description and rating are required' });
    }

    if (typeof rating !== 'number' || rating < 1 || rating > 5) {
        return res.status(400).json({ error: 'rating must be a number between 1 and 5' });
    }

    try {
        const newReview = await prisma.review.create({
            data: {
                identite,
                description,
                rating,
                name: name && name.trim() ? name.trim() : 'Anonyme',
                userId: req.user.id, // associe l'avis à l'utilisateur connecté
            }
        });
        return res.status(201).json({ message: 'Avis créé', data: newReview });
    } catch (error) {
        console.error('Erreur POST /add/avis :', error);
        return res.status(500).json({ error: 'Erreur serveur' });
    }
};