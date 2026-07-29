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
const cors = require('../lib/cors');

router.use((req, res, next) => {
    if (cors(req, res)) return;
    next();
});

router.get('/', getMiddleware, getController)
router.get('/avis', getControllerAvis)
router.get('/avis/:id', getControllerAvisId)
router.get('/mes-avis', authMiddleware, getControllerMesAvis)

router.post('/add/avis', postMiddleware, authMiddleware, postController)
router.put('/autoriser/avis/:id', putMiddleware, putController)
router.put('/avis/:id', putMiddleware, authMiddleware, putControllerAvis)
router.delete('/avis/:id', deleteMiddleware, authMiddleware, deleteController)

router.post('/register', postMiddlewareRegister, postControllerRegister)
router.post('/login', postMiddlewareLogin, postControllerLogin)
router.post('/change-password', putMiddleware, putController)
router.post('/forgot-password', postMiddlewareForgotPassword, postControllerForgotPassword)
router.post('/reset-password', postMiddlewareResetPassword, postControllerResetPassword)

module.exports = router;