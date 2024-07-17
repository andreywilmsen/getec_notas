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
    registerService: async (req) => {

        let data = req.body.data;
        let codigo_nf = req.body.numeroNotaFiscal;
        let produtor = req.body.destino;
        let cidade = req.body.procedencia;
        let produto = req.body.produto;
        let un = req.body.unidade;
        let peso = req.body.unidade_peso;
        let qtd = req.body.quantidade;
        let volume = req.body.volume;
        let nome_usuario_sistema = req.body.nome_usuario_sistema;
    
        if (!data || !codigo_nf || !produtor || !cidade || !produto || !qtd || !un || !peso || !volume || !nome_usuario_sistema) {
            return { success: false, isEmpty: true, msg: "Por favor, preencha todos os dados para registro!" };
        }
    
        try {

            console.log({
                data,
                numeroNotaFiscal: codigo_nf,
                destino: produtor,
                procedencia: cidade,
                produto,
                unidade: un,
                unidade_peso: peso,
                quantidade: qtd,
                volume,
                nome_usuario_sistema
            });
            

            const newNote = await Note.create({
                data: data,
                numeroNotaFiscal: codigo_nf,
                destino: produtor,
                procedencia: cidade,
                produto: produto,
                unidade: un,
                unidade_peso: parseFloat(peso),
                quantidade: qtd,
                volume: volume,
                nome_usuario_sistema: nome_usuario_sistema
            });

            return { status: 'success', response: newNote, msg: "Nota registrada com sucesso!" };
        } catch (err) {
            console.log(err);
            return { status: 'failed', erro: err.message, msg: "Falha no registro de nota" };
        }
    }    
,    
    editService: async (req, res) => {
        let codigo_nf = req.body.numeroNotaFiscal;
        let noteFinded = await Note.findOne({ where: { codigo_nf } });

        if (!noteFinded) return { success: false, isFinded: false, msg: "Nota fiscal não encontrada!" };

        let data = req.body.data;
        let produtor = req.body.destino;
        let cidade = req.body.procedencia; // *** Deve puxar o cidade pela produtor acima;
        let produto = req.body.produto;
        let un = req.body.unidade;
        let peso = req.body.unidade_peso; // *** Vai puxar os kg referentes a cada produto com sua respectiva und de medida e multiplicar pela quantidade lançada;
        let qtd = req.body.quantidade;
        let volume = req.body.volume;
        let nome_usuario_sistema = req.body.nome_usuario_sistema

        if (data === "" || codigo_nf === "" || matricula === "" || cidade === "" || produto === "" || qtd === "" || un === "" || peso === "" || volume === "" || nome_usuario_sistema === "") return { success: false, isEmpty: true, msg: "Por favor, preencha todos os dados para edição!" };

        try {

            noteFinded.data = data;
            noteFinded.codigo_nf = codigo_nf;
            noteFinded.produtor = produtor;
            noteFinded.cidade = cidade;
            noteFinded.produto = produto;
            noteFinded.qtd = qtd;
            noteFinded.un = un;
            noteFinded.peso = peso;
            noteFinded.volume = volume;
            noteFinded.nome_usuario_sistema = nome_usuario_sistema;

            let responseNote = await noteFinded.save();

            return { status: 'success', response: responseNote, msg: "Nota editada com sucesso!" };

        } catch (err) {
            return { status: 'failed', erro: err, msg: "Falha na edição de nota" };
        }
    }
};

module.exports = noteService;