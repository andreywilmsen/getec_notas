require('dotenv').config();
const sequelize = require('sequelize');
const Note = require('../model/Note');
const { Op } = require('sequelize');

const noteService = {
    testService: (req, res) => {
        let response = "Conectado ao servidor";
        return { msg: response };
    },
    deleteTestService: async (req, res) => {
        let codigo_nf = req.params.codigo_nf;

        let notFindedAndDeleted = await Note.destroy({
            where: {
                codigo_nf
            }
        });

        return { status: success, msg: "Nota de teste excluida com sucesso!" };
    },
    getService: async (req, res) => {
        let searchDate = req.body.searchDate;

        if (searchDate === "") return { success: false, isEmpty: true, msg: "Por favor, insira algum elemento para pesquisa!" };

        try {
            let result = await Note.findAll({ where: { data: { [Op.like]: `%${searchDate}%` } } });

            if (result.length === 0) return { success: false, emptySearch: true, msg: "Não foram encontradas notas nesse período!" };

            return { success: true, response: result, msg: "Notas capturadas com sucesso!" };
        } catch (err) {
            return { success: false, msg: "Erro na captura de notas!" }
        }
    },
    registerService: async (req, res) => {
        let data = req.body.data;
        let codigo_nf = req.body.codigo_nf;
        let matricula = req.body.matricula; // *** Deve puxar a matricula pelo nome abaixo;
        let produtor = req.body.produtor;
        let cidade = req.body.cidade; // *** Deve puxar o cidade pela produtor acima;
        let num_produto = req.body.num_produto; // *** Deve puxar o numero pelo produto abaixo;
        let produto = req.body.produto;
        let qtd = req.body.qtd;
        let un = req.body.un;
        let peso = req.body.peso; // *** Vai puxar os kg referentes a cada produto com sua respectiva und de medida e multiplicar pela quantidade lançada;

        if (data === "" || codigo_nf === "" || matricula === "" || cidade === "" || produto === "" || qtd === "" || un === "" || peso === "") return { success: false, isEmpty: true, msg: "Por favor, preencha todos os dados para registro!" };

        try {
            const newNote = await Note.create({
                data,
                codigo_nf,
                matricula,
                produtor,
                cidade,
                num_produto,
                produto,
                qtd,
                un,
                peso
            });
            return { status: 'success', response: newNote, msg: "Nota registrada com sucesso!" };
        } catch (err) {
            return { status: 'failed', erro: err, msg: "Falha no registro de nota" };
        }
    },
    editService: async (req, res) => {
        let codigo_nf = req.body.codigo_nf;
        let noteFinded = await Note.findOne({ where: { codigo_nf } });

        if (!noteFinded) return { success: false, isFinded: false, msg: "Nota fiscal não encontrada!" };

        let data = req.body.data;
        let matricula = req.body.matricula; // *** Deve puxar a matricula pelo nome abaixo;
        let produtor = req.body.produtor;
        let cidade = req.body.cidade; // *** Deve puxar o cidade pela produtor acima;
        let num_produto = req.body.num_produto; // *** Deve puxar o numero pelo produto abaixo;
        let produto = req.body.produto;
        let qtd = req.body.qtd;
        let un = req.body.un;
        let peso = req.body.peso; // *** Vai puxar os kg referentes a cada produto com sua respectiva und de medida e multiplicar pela quantidade lançada;

        if (data === "" || codigo_nf === "" || matricula === "" || produtor === "" || cidade === "" || num_produto === "" || produto === "" || qtd === "" || un === "" || peso === "") return { success: false, isEmpty: true, msg: "Por favor, preencha todos os dados para a edição!" };

        try {

            noteFinded.data = data;
            noteFinded.codigo_nf = codigo_nf;
            noteFinded.matricula = matricula;
            noteFinded.produtor = produtor;
            noteFinded.cidade = cidade;
            noteFinded.num_produto = num_produto;
            noteFinded.produto = produto;
            noteFinded.qtd = qtd;
            noteFinded.un = un;
            noteFinded.peso = peso;

            let responseNote = await noteFinded.save();

            return { status: 'success', response: responseNote, msg: "Nota editada com sucesso!" };

        } catch (err) {
            return { status: 'failed', erro: err, msg: "Falha na edição de nota" };
        }
    }
};

module.exports = noteService;