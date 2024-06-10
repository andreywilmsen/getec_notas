require('dotenv').config();
const Usuario = require('../model/Usuarios'); // Supondo que o modelo seja definido em Usuario.js

const userService = {
    registerService: async (req, res) => {
        let matricula = req.body.matricula;
        let nome = req.body.nome;
        let culturas = req.body.culturas;

        try {
            // Antes de criar o usuário, converta o array de culturas em uma string separada por vírgula
            if (culturas && Array.isArray(culturas)) {
                culturas = culturas.join(',');
            }

            let response = await Usuario.create({ matricula, nome, culturas });

            if (!response) return { success: false };

            return { success: true, user: response, msg: "Usuário cadastrado com sucesso!" };
        } catch (err) {
            return { success: false, msg: "Falha ao cadastrar usuário", err };
        }
    },
}

module.exports = userService;
