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

        let findedProduct = await Products.findOne({ where: { codigo, nome, und, peso } });

        if (findedProduct !== null)
            return { success: false, isFinded: true, msg: "Produto já cadastrado!" };

        try {
            let result = await Products.create({ codigo, nome, und, peso });

            if (!result) return { success: false, msg: "Erro no cadastramento do produto!" };

            return { success: true, response: result, msg: "Produto cadastrado com sucesso!" };
        } catch (err) {
            return { success: false, err, msg: "Erro no cadastramento do produto!" };
        }
    },
    getService: async (req, res) => {
        try {
            if (Object.keys(req.body).length === 0) {
                let listProducts = await Products.findAll({});
                return { success: true, listProducts, msg: "Leitura concluida!" };
            }

            let listProducts = await Products.findAll({ where: { nome: { [Op.like]: `%${req.body.nome}%` } } });
            console.log(listProducts.length)
            if (listProducts.length == 0) return { success: false, isEmpty: true, msg: "Produtos não encontrados!" };

            return { success: true, listProducts, msg: "Leitura concluida!" };

        } catch (err) {
            return { success: false, err, msg: "Erro na leitura dos produtos!" };
        }
    },
};

module.exports = productsService;