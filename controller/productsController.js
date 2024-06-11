const productsService = require('../services/productsService');

const productsController = {

    deleteTestController: async (req, res) => {
        try {
            let response = await productsService.deleteTestService(req, res);
            if (response) return res.status(200).json({ msg: response.msg });
        } catch (err) {
            res.status(500).send("Ocorreu um erro ao deletar o produto de teste");
        }
    },
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
    editController: async (req, res) => {
        try {
            let response = await productsService.editService(req, res);
            if (response.isEmptyFields === true) return res.status(400).json({ msg: response.msg });
            if (response) return res.status(200).json({ msg: response.msg });
        } catch (err) {
            console.log(err);
            res.status(500).send("Ocorreu um erro na rota edit");
        }
    },
    getController: async (req, res) => {
        try {
            let response = await productsService.getService(req, res);
            if (response.isEmpty === true) return res.status(400).json({ msg: response.msg });
            if (response) return res.status(200).json({ products: response.listProducts, msg: response.msg });
        } catch (err) {
            console.log(err);
            res.status(500).send("Ocorreu um erro na rota register");
        }
    },
}


module.exports = productsController;