const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');
const noteController = require('../controller/noteController');

// ROTAS DE LOGIN

router.get("/", userController.testController);

router.post("/register", userController.registerController);

router.get("/login", userController.loginController);

router.post("/auth", userController.authController);

router.delete("/user/:email", userController.deleteController);

// ROTAS DE CADASTRO DE NOTAS

router.get("/test_note", noteController.testController);


router.post("/register_note", noteController.registerController);

module.exports = router;
