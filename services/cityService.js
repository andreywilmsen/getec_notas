require('dotenv').config();
const sequelize = require('sequelize');
const City = require('../model/City');
const { Op } = require('sequelize');

const cityService = {

    getService: async (req, res) => {
        try {
            console.log(req.body)
            if (Object.keys(req.body).length === 0) {
                let listCity = await City.findAll({});
                return { success: true, listCity, msg: "Leitura concluida!" };
            }

            let listCity = await City.findAll({ where: { cidade: { [Op.like]: `%${req.body.cidade}%` } } });

            if (listCity.length == 0) return { success: false, isEmpty: true, msg: "Produtos não encontrados!" };

            return { success: true, listCity, msg: "Leitura concluida!" };

        } catch (err) {
            console.log(err);
            return { success: false, err, msg: "Erro na leitura dos produtos!" };
        }
    },
};

module.exports = cityService;