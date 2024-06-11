const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');
const usuariosController = require('../controller/usuariosController');
const noteController = require('../controller/noteController');
const productsController = require('../controller/productsController');


// ROTAS DE LOGIN

router.get("/", userController.testController);

router.post("/register", userController.registerController);

router.get("/login", userController.loginController);

router.post("/auth", userController.authController);

router.delete("/user/:email", userController.deleteController);

// ROTAS DE CADASTRO DE NOTAS

router.get("/test_note", noteController.testController);

router.delete("/delete_note_test/:codigo_nf", noteController.deleteTestController);

router.get("/get_notes", noteController.getController);

router.post("/register_note", noteController.registerController);

router.put("/edit_note", noteController.editController);

// ROTAS DE USUÁRIO (PERMISSIONÁRIOS / ATACADISTAS)

router.get("/get_usuarios", usuariosController.getController);

router.post("/register_usuario", usuariosController.registerController);

router.delete("/delete_usuario_test/:matricula", usuariosController.deleteTestController);

router.put("/edit_usuarios", usuariosController.editController);

// ROTAS DE PRODUTOS

router.delete("/delete_products_test/:codigo", productsController.deleteTestController);

router.post("/register_products", productsController.registerController);

router.get("/get_products", productsController.getController);


module.exports = router;
