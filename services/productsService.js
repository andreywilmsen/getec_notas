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
        let id = req.body.codigo;
        let produto = req.body.produto;
        let kg = req.body.kg
        let cx = req.body.cx
        let cxt = req.body.cxt
        let dz = req.body.dz
        let eng = req.body.eng
        let mol = req.body.mol
        let scl = req.body.scl
        let saco = req.body.saco
        let bdj = req.body.bdj
        let und = req.body.und
        let outros = req.body.outros

        if (id === "" || produto === "" || kg === "" || cx === "" || cxt === "" || dz === "" || eng === "" || mol === "" || scl === "" || saco === "" || bdj === "" || und === "" || outros === "") {
            return { success: false, isEmptyFields: true, msg: "Por favor, preencha todos os dados para o cadastramento!" };
        }

        let findedProduct = await Products.findOne({ where: { id, produto, kg, cx, cxt, dz, eng, mol, scl, saco, bdj, und, outros } });

        if (findedProduct !== null)
            return { success: false, isFinded: true, msg: "Produto já cadastrado!" };

        try {
            let result = await Products.create({ id, produto, kg, cx, cxt, dz, eng, mol, scl, saco, bdj, und, outros });

            if (!result) return { success: false, msg: "Erro no cadastramento do produto!" };

            return { success: true, response: result, msg: "Produto cadastrado com sucesso!" };
        } catch (err) {
            return { success: false, err, msg: "Erro no cadastramento do produto!" };
        }
    },
    editService: async (req, res) => {

        let searchCodigo = req.body.id;
        let productFinded = await Products.findOne({ where: { id: searchCodigo } });

        if (!productFinded) return { success: false, isFinded: false, msg: "Usuário não encontrado!" };

        let id = req.body.codigo;
        let produto = req.body.produto;
        let kg = req.body.kg
        let cx = req.body.cx
        let cxt = req.body.cxt
        let dz = req.body.dz
        let eng = req.body.eng
        let mol = req.body.mol
        let scl = req.body.scl
        let saco = req.body.saco
        let bdj = req.body.bdj
        let und = req.body.und
        let outros = req.body.outros

        if (id === "" || produto === "" || kg === "" || cx === "" || cxt === "" || dz === "" || eng === "" || mol === "" || scl === "" || saco === "" || bdj === "" || und === "" || outros === "") {
            return { success: false, isEmptyFields: true, msg: "Por favor, preencha todos os dados para o cadastramento!" };
        }


        try {
            productFinded.id = id;
            productFinded.produto = produto;
            productFinded.kg = kg;
            productFinded.cx = cx;
            productFinded.cxt = cxt;
            productFinded.dz = dz;
            productFinded.eng = eng;
            productFinded.mol = mol;
            productFinded.scl = scl;
            productFinded.saco = saco;
            productFinded.bdj = bdj;
            productFinded.und = und;
            productFinded.outros = outros;

            let responseProducts = await productFinded.save();

            return { success: true, response: responseProducts, msg: "Produto editado com sucesso!" };

        } catch (err) {
            console.log('erro: ' + err);
            return { success: false, erro: err, msg: "Falha na edição de produto" };
        }
    },
    getService: async (req, res) => {
        try {
            console.log(req.body)
            if (Object.keys(req.body).length === 0) {
                let listProducts = await Products.findAll({});
                return { success: true, listProducts, msg: "Leitura concluida!" };
            }

            let listProducts = await Products.findAll({ where: { produto: { [Op.like]: `%${req.body.nome}%` } } });

            if (listProducts.length == 0) return { success: false, isEmpty: true, msg: "Produtos não encontrados!" };

            return { success: true, listProducts, msg: "Leitura concluida!" };

        } catch (err) {
            console.log('DEU RUIM AQUI VEY !!!!!!!!')
            console.log(err);
            return { success: false, err, msg: "Erro na leitura dos produtos!" };
        }
    },
};

module.exports = productsService;