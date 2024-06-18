let supertest = require('supertest');
let server = require('../index');

let request = supertest(server);

let mainUser = {
    name: "Andrey Wilmsen",
    email: "andreywilmsendepaula@gmail.com",
    password: "123456",
    confirmPassword: "123456"
};

describe("Conexão com servidor", function () {
    it("Deve se conectar a porta 8080", async () => {
        return request.get("/")
            .then(res => {
                expect(res.statusCode).toEqual(200);
            }).catch(err => {
                throw err;
            })
    })
});

describe("Registro de usuário", function () {

    it("Deve registrar um usuário", async () => {
        return request.post("/login/register").send(mainUser)
            .then(res => {
                expect(res.statusCode).toEqual(200);
            }).catch(err => {
                throw err;
            })
    });
    it("Deve impedir que um usuário cadastre dados vazios", async () => {
        let user = { name: "", email: "", password: "", confirmPassword: "" };

        return request.post("/login/register").send(user)
            .then(res => {
                expect(res.statusCode).toEqual(400);
                expect(res.body.message).toEqual("Não é permitido inserir dados vazios")
            }).catch(err => {
                throw err;
            })
    });
    it("Deve impedir que cadastre um email já cadastrado", async () => {
        return request.post("/login/register").send(mainUser)
            .then(res => {
                expect(res.statusCode).toEqual(400);
                expect(res.body.message).toEqual("Usuário já cadastrado");
            }).catch(err => {
                throw err;
            })
    })
    it("Deve impedir que insira o password e a confirmação diferentes", async () => {

        let user = {
            name: "Andrey Wilmsen",
            email: "usuariodeteste@gmail.com",
            password: "1234567",
            confirmPassword: "123456"
        }

        return request.post("/login/register").send(user)
            .then(res => {
                expect(res.statusCode).toEqual(400);
                expect(res.body.message).toEqual("As senhas não são identicas");
            }).catch(err => {
                throw err;
            })
    })

});

describe("Login", function () {
    it("Deve efetuar o login do usuário", async () => {
        return request.post("/login").send(mainUser)
            .then(res => {
                expect(res.statusCode).toEqual(200);
                expect(res.body.message).toEqual("Usuário logado com sucesso")
            }).catch(err => {
                throw err;
            })
    })

    it("Deve verificar se o email informado está cadastrado", async () => {
        let user = {
            email: "usuariodeteste@gmail.com",
            password: "123456"
        };

        return request.post("/login").send(user)
            .then(res => {
                expect(res.statusCode).toEqual(400);
                expect(res.body.message).toEqual("Usuário ou senha incorretos");
            }).catch(err => {
                throw err;
            });
    });

    it("Deve coincidir o password informado com o password registrado no login", async () => {
        let user = {
            email: "andreywilmsendepaula@gmail.com",
            password: "1234567"
        };

        return request.post("/login").send(user)
            .then(res => {
                expect(res.statusCode).toEqual(400);
                expect(res.body.message).toEqual("Usuário ou senha incorretos")
            }).catch(err => {
                throw err;
            })
    })

    it("Deve gerar um token de acesso ao efetuar o login", async () => {
        return request.post("/login").send(mainUser)
            .then(res => {
                expect(res.statusCode).toEqual(200);
                expect(res.body.token).toBeDefined()
            }).catch(err => {
                throw err;
            })
    })
})

describe("Autenticação", function () {
    it("Deve verificar se o token fornecido é válido e retornar o usuário referente ao token", async () => {
        let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFuZHJleXdpbG1zZW5kZXBhdWxhQGdtYWlsLmNvbSIsImlhdCI6MTcxODU1MzkxMSwiZXhwIjoxNzE4NzI2NzExfQ.xoCQ6DS2og_l1cs37GRZ89XOYlDoZlLPiDWSZDIxCTg";

        return request.post("/auth")
            .set("authorization-token", `${token}`)
            .then(res => {
                console.log(res);
                expect(res.statusCode).toEqual(200);
                expect(res.body.user).toBeDefined();
            }).catch(err => {
                throw err;
            })
    });

    it("Deve retornar como usuário não autorizado caso informe um token inválido", async () => {
        let token = { token: "AAAeyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFuZHJleXdpbG1zZW5kZXBhdWxhQGdtYWlsLmNvbSIsImlkIjoiNjY0YTFiNmYxZmQyNGFhODY5YWQ2MDllIiwiaWF0IjoxNzE2MTMyNzIzLCJleHAiOjE3MTYzMDU1MjN9.YkylBZJ2BPsRPF9ZAhkeua5-a-0yuOmd9psgK4vGJoQ" };

        return request.post("/auth").send(token)
            .then(res => {
                expect(res.statusCode).toEqual(400);
                expect(res.body.message).toEqual("Usuário não autorizado");
            }).catch(err => {
                throw err;
            })
    });
});

describe("Deletar usuário", function () {
    it("Deve excluir usuário pelo email fornecido", async () => {
        return request.delete(`/user/${mainUser.email}`)
            .then(res => {
                expect(res.statusCode).toEqual(200);
                expect(res.body.message).toEqual("Usuário deletado com sucesso");
            }).catch(err => {
                throw err;
            })
    });
});

afterAll((done) => {
    server.close(done);
});