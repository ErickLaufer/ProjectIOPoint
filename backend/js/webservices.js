// ********* ARQUIVO SOMENTE PARA BACKUP *********
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const db = require('./DataBase.js')
const options = {
    host: '192.168.0.104',
    port: 3050,
    database: 'HomologacaoRealce',
    lowercase_keys: false,
    role: null,
    pageSize: 4096,
    retryConnectionInterval: 1000,
    blobAsText: false,
    encoding: 'UTF-8',
    user: "SYSDBA",
    password: "masterkey"
    };
// parse requests of content-type: application/json
app.use(bodyParser.json());
// parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// simple route
app.get("/", (req, res) => {
res.json({ message: "Bem-vindo ao servidor!" });
});
// simple route
app.get("/ola", (req, res) => {
res.json({ message: "Olá pra você também!" });
});
app.get("/ProductionOrders", (req, res) => {
    res.json({ message: "Tela para visualizar Ordens de Produção" });
    });
app.get('/separar', db.getRequisicoes)
// set port, listen for requests
app.get('/buscaEndereco', db.getEndereco)

app.listen(8080, () => {
console.log("Servidor rodando na porta 8080.");
});
module.exports = options;