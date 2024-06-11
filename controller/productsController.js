const productsService = require('../services/productsService');

const productsController = {

    registerController: async (req, res) => {
        try {
            let response = await productsService.registerService(req, res);
            if (response.isEmptyFields === true) return res.status(400).json({ msg: response.msg });
            if (response.isFinded === true) return res.status(400).json({ msg: response.msg });
            if (response) return res.status(200).json({ msg: response.msg });
        } catch (err) {
            console.log(err);
            res.status(500).send("Ocorreu um erro na rota register");
        }
    },
}


module.exports = productsController;