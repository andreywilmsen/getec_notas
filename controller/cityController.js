const cityService = require('../services/cityService');

const cityController = {

    getController: async (req, res) => {
        try {
            let response = await cityService.getService(req, res);
            if (response.isEmpty === true) return res.status(400).json({ msg: response.msg });
            if (response) return res.status(200).json({ cidade: response.listCity, msg: response.msg });
        } catch (err) {
            console.log(err);
            res.status(500).send("Ocorreu um erro na rota register");
        }
    },
}

module.exports = cityController;