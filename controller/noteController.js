const noteService = require('../services/noteService');

const noteController = {
    testController: async (req, res) => {
        try {
            let response = await noteService.testService(req, res);
            if (response) return res.status(200).send(response.response);
        } catch (err) {
            res.status(500).send("Ocorreu um erro na rota GET NOTE");
        }
    },
    registerController: async (req, res) => {
        try {
            let response = await noteService.registerNoteService(req, res);
            if (response) return res.status(200).send(response.msg);
        } catch (err) {
            res.status(500).send("Ocorreu um erro no register")
        }
    }
}


module.exports = noteController;