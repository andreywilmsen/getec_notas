require('dotenv').config();
const sequelize = require('sequelize');
const Note = require('../model/Note');

const noteService = {
    testService: (req, res) => {
        let response = "Conectado ao servidor";
        return { msg: response };
    },
    registerNoteService: async (req, res) => {
        let data = req.body.data;
        let codigo_nf = req.body.codigo_nf;
        let matricula = req.body.matricula; // Deve puxar o produtor pela matricula
        let cidade = req.body.cidade;
        let produto = req.body.produto; // Deve puxar o produto pelo codigo
        let qtd = req.body.qtd;
        let un = req.body.un;
        let peso = req.body.peso;

        if (data === "" || codigo_nf === "" || matricula === "" || cidade === "" || produto === "" || qtd === "" || un === "" || peso === "") return { success: false, isEmpty: true, msg: "Por favor, preencha todos os dados para registro!" };

        try {
            const newNote = await Note.create({
                data,
                codigo_nf,
                matricula,
                cidade,
                produto,
                qtd,
                un,
                peso
            });
            return { status: 'success', response: newNote, msg: "Nota registrada com sucesso!" };
        } catch (err) {
            console.log(err)
            return { status: 'failed', erro: err, msg: "Falha no registro de nota" };
        }
    }
};

module.exports = noteService;