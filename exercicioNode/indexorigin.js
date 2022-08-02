const express = require("express");
const app = express();
const port = process.env.PORT;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("/", (req, res) => {
  res.send({
    message: "Bem vindo ao endpoint incial",
  });
});

app.get("/produtos", (req, res) => {
  res.send({
    message: "Endpoint de buscar os produtos",
  });
});

app.get("/produtos/:idproduto", (req, res) => {
  res.send({
    message: "Endpoint buscar produto por ID",
    produtoID: req.params.idproduto,
  });
});

app.post("/produtos", (req, res) => {
  var produtos = {
    descricao: req.body.descricao,
    preco: req.body.preco,
  };
  res.send({
    message: "Endpoint post - salvar informação ",
    produtosEnviados: produtos,
  });
});

app.put("/produtos/:idprodutos", (req, res) => {
  var produtos = {
    id: req.params.idprodutos,
    descricao: req.body.descricao,
    preco: req.body.preco,
  };
  res.send({
    message: "Endpoint put -Alteração/atualização de produtos",
    produtosAlterados: produtos,
  });
});

app.delete("/produtos/:idprodutos", (req, res) => {});

app.listen(port, () => {
  console.log(`Executando em http:localhost:${port}`);
});
