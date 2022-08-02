const express = require("express");
const app = express();
const port = process.env.PORT;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

listaprodutos = [
  {
    id: 1,
    descricao: "Milho",
    preco: 7.5,
  },
  {
    id: 2,
    descricao: "Feijão",
    preco: 5.9,
  },
];

app.get("/produtos", (req, res) => {
  res.status(200).send({
    produtos: listaprodutos,
    message: "Endpoint de buscar os produtos",
  });
});

app.get("/produtos/:idproduto", (req, res) => {
  var idproduto = req.params.idproduto;
  var produto = "";
  for (let prod of listaprodutos) {
    if (prod.id == idproduto) {
      produto = prod;
      break;
    }
  }
  if (produto == "") {
    res.status(404).send({
      message: "Produto não encontrado",
    });
  } else {
    res.status(200).send(produto);
  }
});

app.post("/produtos", (req, res) => {
  var produtos = {
    id: 10,
    descricao: req.body.descricao,
    preco: req.body.preco,
  };
  listaprodutos.push(produtos);
  res.status(201).send({
    message: "Produto inserido com sucesso ",
    produtos: produtos,
  });
});

app.put("/produtos/:idprodutos", (req, res) => {
  var idproduto = req.params.idprodutos;
  var produto = "";

  for (let prod of listaprodutos) {
    if (prod.id == idproduto) {
      prod.descricao = req.body.descricao;
      prod.preco = req.body.preco;
      produto = prod;
    }
  }
  if (produto == "") {
    res.status(404).send({
      message: "Produto não encontrado",
    });
  } else {
    res.status(200).send(produto);
  }
});

app.delete("/produtos/:idprodutos", (req, res) => {
  var idproduto = req.params.idprodutos;
  for (let i = 0; i < listaprodutos.length; i++) {
    if (listaprodutos[i].id == idproduto) {
      listaprodutos.splice(i, 1);
    }
  }
  res.status(200).send({
    message: "Registro excluido com sucesso",
    id: idproduto,
  });
});

app.listen(port, () => {
  console.log(`Executando em http:localhost:${port}`);
});
