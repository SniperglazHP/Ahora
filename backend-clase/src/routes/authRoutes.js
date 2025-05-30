const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Rutas de autenticación
router.post('/register', authController.register);
router.post('/login', authController.login);


// Rutas de CRUD
router.get('/listar', authController.Listar);
router.post('/crear', authController.Crear);
router.delete('/borrar', authController.Borrar);
router.patch('/editar', authController.Editar);
module.exports = router; 