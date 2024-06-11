let supertest = require('supertest');
let server = require('../index');

let request = supertest(server);

let mainProduct = {
    codigo: "5268746",
    nome: "Batata Inglesa",
    und: "CX",
    peso: 23
};

describe("Registro de produto", function () {
    it("Deve registrar um produto", async () => {
        return request.post("/register_products").send(mainProduct)
            .then(res => {
                expect(res.statusCode).toEqual(200);
            }).catch(err => {
                throw err;
            });
    });

    it("Deve impedir o cadastramento de um produto com campos vazios", async () => {
        let product = { codigo: "", nome: "", und: "", peso: "" };

        return request.post("/register_products").send(product)
            .then(res => {
                expect(res.statusCode).toEqual(400);
                expect(res.body.msg).toEqual("Por favor, preencha todos os dados para o cadastramento!");
            }).catch(err => {
                throw err;
            });
    });
    it("Deve impedir o cadastramento de um produto com dados iguais", async () => {
        return request.post("/register_products").send(mainProduct)
            .then(res => {
                expect(res.statusCode).toEqual(400);
                expect(res.body.msg).toEqual("Produto já cadastrado!")
            }).catch(err => {
                throw err;
            });
    });

    afterAll(() => {
        return request.delete("/delete_products_test/5268746").then(res => {
        }).catch(err => {
            throw err;
        });
    });
});

describe("Leitura de produtos", function () {
    it("Deve ler todos os produtos registrados", async () => {
        return request.get("/get_products").send()
            .then(res => {
                expect(res.statusCode).toEqual(200);
                expect(res.body.msg).toEqual("Leitura concluida!");
            }).catch(err => {
                throw err;
            });
    });
    it("Deve disparar um erro ao não encontrar uma referencia com os parametros de busca", async () => {
        return request.get("/get_products").send({ name: "W" })
            .then(res => {
                expect(res.statusCode).toEqual(400);
                expect(res.body.msg).toEqual("Produtos não encontrados!");
            }).catch(err => {
                throw err;
            });
    });
});

afterAll((done) => {
    server.close(done);
});