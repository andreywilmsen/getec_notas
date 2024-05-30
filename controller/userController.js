const userService = require('../services/userService');

const userController = {
    testController: async (req, res) => {
        try {
            let response = await userService.testService(req, res);
            if (response) return res.status(200).send(response.response);
        } catch (err) {
            res.status(500).send("Ocorreu um erro na rota GET");
        }
    },
    registerController: async (req, res) => {
        try {
            let response = await userService.registerService(req, res);
            if (response.userFinded === true) return res.status(400).json({ message: "Usuário já cadastrado" })
            if (response.verifyEmptyFields === false) return res.status(400).json({ message: "Não é permitido inserir dados vazios" });
            if (response.confirmPassword === false) return res.status(400).json({ message: "As senhas não são identicas" });
            if (response) return res.status(200).send(response.user);
        } catch (err) {
            res.status(500).send("Ocorreu um erro na rota register");
        }
    },
    loginController: async (req, res) => {
        try {
            let response = await userService.loginService(req, res);
            if (response.userFinded === false) return res.status(400).json({ message: "Usuário ou senha incorretos" });
            if (response.passwordVerified === false) return res.status(400).json({ message: "Usuário ou senha incorretos" });
            if (response.userFinded === true) return res.status(200).json({ message: "Usuário logado com sucesso", token: response.token });
        } catch (err) {
            res.status(500).send("Ocorreu um erro na rota login")
        }
    },
    authController: async (req, res) => {
        try {
            let response = await userService.authService(req, res);
            if (response.tokenVerified === false) return res.status(400).json({ message: "Usuário não autorizado" })
            if (response.user) return res.status(200).json({ message: "Usuário autenticado com sucesso", user: response.user });
        } catch (err) {
            res.status(500).send("Ocorreu um erro na rota de autenticação")
        }
    },
    deleteController: async (req, res) => {
        try {
            let response = await userService.deleteService(req, res);

            if (response) return res.status(200).json({ message: "Usuário deletado com sucesso" })
        }
        catch (err) {
            res.status(500).send("Ocorreu um erro na rota delete");
        }
    }
}


module.exports = userController;