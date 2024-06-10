const usuariosService = require('../services/usuariosService');

const usuarioController = {
    registerController: async (req, res) => {
        try {
            let response = await usuariosService.registerService(req, res);
            if (response) return res.status(200).send(response.user);
        } catch (err) {
            res.status(500).send("Ocorreu um erro na rota register");
        }
    },
}


module.exports = usuarioController;