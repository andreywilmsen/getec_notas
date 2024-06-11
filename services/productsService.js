require('dotenv').config();
const sequelize = require('sequelize');
const Products = require('../model/Products');
const { Op } = require('sequelize');

const productsService = {
    registerService: async (req, res) => {

        let codigo = req.body.codigo;
        let nome = req.body.nome;
        let und = req.body.und;
        let peso = req.body.peso;

        if (codigo === "" || nome === "" || und === "" || peso === "") {
            return { success: false, isEmptyFields: true, msg: "Por favor, preencha todos os dados para o cadastramento!" };
        }

        try {
            let result = await Products.create({ codigo, nome, und, peso });

            if (!result) return { success: false, msg: "Erro no cadastramento do produto!" };

            return { success: true, response: result, msg: "Produto cadastrado com sucesso!" };
        } catch (err) {
            return { success: false, err, msg: "Erro no cadastramento do produto!" };
        }
    },
};

module.exports = productsService;