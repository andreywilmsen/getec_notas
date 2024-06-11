require('dotenv').config();
const sequelize = require('sequelize');
const Products = require('../model/Products');
const { Op } = require('sequelize');

const productsService = {
    deleteTestService: async (req, res) => {
        let codigo = req.params.codigo;

        let notFindedAndDeleted = await Products.destroy({
            where: {
                codigo
            }
        });

        return { status: success, msg: "Produto de teste excluido com sucesso!" };
    },
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
    editService: async (req, res) => {

        let searchCodigo = req.body.codigo;
        let productFinded = await Products.findOne({ where: { codigo: searchCodigo } });

        if (!productFinded) return { success: false, isFinded: false, msg: "Usuário não encontrado!" };

        let codigo = req.body.codigo;
        let nome = req.body.nome;
        let und = req.body.und;
        let peso = req.body.peso;

        if (codigo === "" || nome === "" || und === "" || peso === "") return { success: false, isEmptyFields: true, msg: "Por favor, preencha todos os dados para a edição!" };

        try {
            productFinded.codigo = codigo;
            productFinded.nome = nome;
            productFinded.und = und;
            productFinded.peso = peso;

            let responseProducts = await productFinded.save();

            return { success: true, response: responseProducts, msg: "Produto editado com sucesso!" };

        } catch (err) {
            console.log('erro: ' + err);
            return { success: false, erro: err, msg: "Falha na edição de produto" };
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