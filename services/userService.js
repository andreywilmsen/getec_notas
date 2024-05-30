require('dotenv').config();
const User = require('../model/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userService = {
    testService: async (req, res) => {
        let response = "Hello from GET";
        return { response };
    },
    registerService: async (req, res) => {
        // Cria os salts para criptografia de senha
        let saltRounds = parseInt(process.env.SALT);
        let salt = await bcrypt.genSalt(saltRounds);

        let name = req.body.name;
        let email = req.body.email;
        let password = await bcrypt.hash(req.body.password, salt);
        let confirmPassword = req.body.confirmPassword;

        let userFinded = await User.findOne({ email });

        // Impede que insira um usuário que já está cadastrado
        if (userFinded) return { success: false, userFinded: true };

        // Impede que insira um usuário com dados vazios
        if (name === "" || email === "" || password === "" || confirmPassword === "") {
            return { success: false, verifyEmptyFields: false };
        }

        // Impede que insira um usuário que inseriu a confirmação de senha diferente da senha
        if (confirmPassword != req.body.password) return { success: false, confirmPassword: false };

        // Caso esteja tudo correto, cria o usuário
        let response = await User.create({ name, email, password });

        return { user: response, success: true };

    },
    loginService: async (req, res) => {
        let email = req.body.email;
        let password = req.body.password;

        // Verifica se o usuário está cadastrado
        let userFinded = await User.findOne({ email });

        // Caso não, retorna como usuário não encontrado com status 400
        if (!userFinded) return ({ success: false, userFinded: false });

        // Verifica se a senha informada coincide com a senha cadastrado ao usuário, caso não, retorna como status 400
        if (await bcrypt.compareSync(password, userFinded.password) === false) return { passwordVerified: false };

        // Gera token de acesso
        let token = jwt.sign({ email, id: userFinded._id }, process.env.TOKEN_SECRET, { expiresIn: '48h' });

        // Retorna o usuário como autorizado, com o token válido gerado
        if (userFinded) return ({ success: true, userFinded: true, token, user: userFinded });

    },
    authService: async (req, res) => {
        let token = req.body.token;

        try {
            // Verifica se o token recebido é válido com o segredo no back-end
            let tokenVerified = jwt.verify(token, process.env.TOKEN_SECRET);

            // Caso inválido, retorna como token inválido com o status false, e com o status 400
            if (!tokenVerified) {
                return { success: false, tokenVerified: false };
            } else {
                // Caso contrário, retorna como token válido com status 200
                return { success: true, user: tokenVerified };
            }
        } catch (err) {
            // Caso de erro na verificação, retorna como falso e imprime o erro no console
            console.error(err);
            return { success: false, tokenVerified: false };
        }
    },

    deleteService: async (req, res) => {
        let email = req.params.email;

        let response = await User.deleteOne({ email });

        if (response) return { user: response, success: true };

    }
}


module.exports = userService;