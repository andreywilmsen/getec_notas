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
});

// afterAll(() => {
//     return request.delete("/delete_usuario_test/508874").then(res => {
//     }).catch(err => {
//         throw err;
//     });
// });

afterAll((done) => {
    server.close(done);
});