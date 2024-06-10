require('dotenv').config();
const Usuarios = require('../model/Usuarios'); // Supondo que o modelo seja definido em Usuario.js
const { Op } = require('sequelize');

const usuariosService = {
    deleteTestService: async (req, res) => {
        let matricula = req.params.matricula;

        let notFindedAndDeleted = await Usuarios.destroy({
            where: {
                matricula
            }
        });

        return { status: success, msg: "Nota de teste excluida com sucesso!" };
    },
    registerService: async (req, res) => {
        let matricula = req.body.matricula;
        let nome = req.body.nome;
        let culturas = req.body.culturas;

        if (matricula === "" || nome === "" || culturas === "") return { success: false, isEmptyFields: true, msg: "Não é permitido inserir dados vazios!" }

        try {
            // Antes de criar o usuário, converta o array de culturas em uma string separada por vírgula
            if (culturas && Array.isArray(culturas)) {
                culturas = culturas.join(',');
            }

            let response = await Usuarios.create({ matricula, nome, culturas });

            if (!response) return { success: false };

            return { success: true, user: response, msg: "Usuário cadastrado com sucesso!" };
        } catch (err) {
            return { success: false, msg: "Falha ao cadastrar usuário", err };
        }
    },
    getService: async (req, res) => {
        let searchMechanism = req.body.searchMechanism;
        let search = req.body.search;

        if (searchMechanism === "" || search === "") return { success: false, isEmpty: true, msg: "Não é permitido efetuar busca com dados vazios!" }

        try {
            if (searchMechanism === "name") {
                let result = await Usuarios.findAll({ where: { nome: { [Op.like]: `%${search}%` } } });
                if (result.length === 0) return { success: false, emptySearch: true, msg: "Não foram encontradas notas nesse período!" };

                return { success: true, response: result, msg: "Busca efetuada com sucesso!" };
            }
            else {
                let result = await Usuarios.findAll({ where: { matricula: { [Op.like]: `%${search}%` } } });
                if (result.length === 0) return { success: false, emptySearch: true, msg: "Não foram encontrados produtores / atacadistas!" };

                return { success: true, response: result, msg: "Busca efetuada com sucesso!" };
            }
        } catch (err) {
            return { success: false, msg: "Erro na captura de produtores / atacadistas!" }
        }
    },
    editService: async (req, res) => {
        let searchMatricula = req.body.matricula;
        let usuarioFinded = await Usuarios.findOne({ where: { matricula: searchMatricula } });

        if (!usuarioFinded) return { success: false, isFinded: false, msg: "Usuário não encontrado!" };

        let matricula = req.body.matricula;
        let nome = req.body.nome;
        let culturas = req.body.culturas;

        if (culturas && Array.isArray(culturas)) {
            culturas = culturas.join(',');
        }

        if (matricula === "" || nome === "" || culturas === "") return { success: false, isEmpty: true, msg: "Por favor, preencha todos os dados para a edição!" };

        try {
            usuarioFinded.matricula = matricula;
            usuarioFinded.nome = nome;
            usuarioFinded.culturas = culturas;

            let responseUsuarios = await usuarioFinded.save();

            return { success: true, response: responseUsuarios, msg: "Usuario editado com sucesso!" };

        } catch (err) {
            console.log('erro: ' + err);
            return { success: false, erro: err, msg: "Falha na edição de usuario" };
        }
    }
}
module.exports = usuariosService;
