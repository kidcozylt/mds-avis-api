
const express = require('express');
const router = express.Router();
 
const getController = require('../controllers/get.controllers');
const getControllerAvis = require('../controllers/get.controllers.reviews');
const getControllerAvisId = require('../controllers/get.controllers.reviews.id');
const getControllerMesAvis = require('../controllers/get.controllers.reviews.mine');
const postController = require('../controllers/post.controllers');
const postControllerRegister = require('../controllers/post.controllers.register');
const postControllerLogin = require('../controllers/post.controllers.login');
const postControllerForgotPassword = require('../controllers/post.controllers.forgot-password');
const postControllerResetPassword = require('../controllers/post.controllers.reset-password');
const putController = require('../controllers/put.controllers');
const putControllerAvis = require('../controllers/put.controllers.reviews');
const deleteController = require('../controllers/delete.controllers');
 
 
const getMiddleware = require('../middleware/get.middleware');
const postMiddleware = require('../middleware/post.middleware');
const postMiddlewareRegister = require('../middleware/post.middleware.register');
const postMiddlewareLogin = require('../middleware/post.middleware.login');
const postMiddlewareForgotPassword = require('../middleware/post.middleware.forgot-password');
const postMiddlewareResetPassword = require('../middleware/post.middleware.reset-password');
const putMiddleware = require('../middleware/put.middleware');
const deleteMiddleware = require('../middleware/delete.middleware');
const authMiddleware = require('../middleware/auth.middleware');
 
router.get('/', getMiddleware, getController)                                                    // accueil de l'API
router.get('/avis', getControllerAvis)                                                           // tous les avis (public)
router.get('/avis/:id', getControllerAvisId)                                                     // un avis précis (public)
router.get('/mes-avis', authMiddleware, getControllerMesAvis)                                     // avis de l'utilisateur connecté
 
// Création / modification / suppression d'un avis
router.post('/add/avis', postMiddleware, authMiddleware, postController)                                         // ajouter un avis
router.put('/autoriser/avis/:id', putMiddleware, putController)                                  // autoriser (publier) un avis
router.put('/avis/:id', putMiddleware, authMiddleware, putControllerAvis)                          // modifier son propre avis
router.delete('/avis/:id', deleteMiddleware, authMiddleware, deleteController)                    // supprimer son propre avis
 
// Authentification
router.post('/register', postMiddlewareRegister, postControllerRegister)                         // créer un compte
router.post('/login', postMiddlewareLogin, postControllerLogin)                                  // se connecter
router.post('/change-password', putMiddleware, putController)                                    // changer de mot de passe
router.post('/forgot-password', postMiddlewareForgotPassword, postControllerForgotPassword)      // demander une réinitialisation
router.post('/reset-password', postMiddlewareResetPassword, postControllerResetPassword)         // réinitialiser le mot de passe
 
module.exports = router;