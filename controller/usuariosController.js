const usuariosService = require('../services/usuariosService');

const usuariosController = {
    registerController: async (req, res) => {
        try {
            let response = await usuariosService.registerService(req, res);
            if (response.isEmptyFields === true) return res.status(400).json({ msg: response.msg })
            if (response) return res.status(200).send(response.user);
        } catch (err) {
            res.status(500).send("Ocorreu um erro na rota register");
        }
    },
    getController: async (req, res) => {
        try {
            let response = await usuariosService.getService(req, res);
            if (response.isEmpty === true) return res.status(400).json({ msg: response.msg });
            if (response) return res.status(200).json({ search: response, msg: response.msg });
        } catch (err) {
            res.status(500).send("Ocorreu um erro na rota get");
        }
    },
}


module.exports = usuariosController;