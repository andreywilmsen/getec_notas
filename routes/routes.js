const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');
const usuariosController = require('../controller/usuariosController');
const noteController = require('../controller/noteController');
const productsController = require('../controller/productsController');
const cityController = require('../controller/cityController');


// ROTAS DE LOGIN

router.get("/", userController.testController);

router.post("/login/register", userController.registerController);

router.post("/login", userController.loginController);

router.post("/auth", userController.authController);

router.delete("/user/:email", userController.deleteController);

// ROTAS DE CADASTRO DE NOTAS

router.get("/test_note", noteController.testController);

router.delete("/delete_note_test/:codigo_nf", noteController.deleteTestController);

router.get("/get_notes", noteController.getController);

router.post("/register_note", noteController.registerController);

router.put("/edit_note", noteController.editController);

// ROTAS DE USUÁRIO (PERMISSIONÁRIOS / ATACADISTAS)

router.post("/get_usuarios", usuariosController.getController);

router.post("/register_usuario", usuariosController.registerController);

router.delete("/delete_usuario_test/:matricula", usuariosController.deleteTestController);

router.put("/edit_usuarios", usuariosController.editController);

// ROTAS DE PRODUTOS

router.post("/register_products", productsController.registerController);

router.post("/get_products", productsController.getController);

router.put("/edit_products", productsController.editController);

router.delete("/delete_products_test/:codigo", productsController.deleteTestController);

// ROTAS DE CIDADES

router.post("/get_city", cityController.getController);

module.exports = router;
