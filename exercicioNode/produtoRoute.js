var express = require("express");
var router = express.Router();

router.get("/", (req, res) => {
  res.send({
    message: "Bem vindo ao endpoint incial",
  });
});

router.get("/produtos", (req, res) => {
  res.send({
    message: "Endpoint de buscar os produtos",
  });
});

router.get("/produtos/:idproduto", (req, res) => {
  res.send({
    message: "Endpoint buscar produto por ID",
    produtoID: req.params.idproduto,
  });
});

router.post("/produtos", (req, res) => {
  var produtos = {
    descricao: req.body.descricao,
    preco: req.body.preco,
  };
  res.send({
    message: "Endpoint post - salvar informação ",
    produtosEnviados: produtos,
  });
});

router.put("/produtos/:idprodutos", (req, res) => {
  var produtos = {
    id: req.body.idproduto,
    descricao: req.body.descricao,
    preco: req.body.preco,
  };
  res.send({
    message: "Endpoint put -Alteração/atualização de produtos",
    produtosAlterados: produtos,
  });
});
module.exports = router;
