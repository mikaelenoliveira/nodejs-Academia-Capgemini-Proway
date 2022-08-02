const express = require("express");
const app = express();
const port = process.env.PORT;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("/", (req, res) => {
  res.send({
    message: "Olá, bem vindo ao endopoint Home!",
  });
});

// app.get("/cadastro", (req, res) => {
//   res.send({
//     message: "Olá você esta no endopoint de cadastro",
//   });
// });

app.get("/contatos", (req, res) => {
  res.send({
    message: "Você esta no endopoint de contatos",
  });
});

app.get("/contatos/:idcontato", (req, res) => {
  res.send({
    message: "Você esta no endopoint de pesquisa por id",
    contatoid: req.params.idcontato,
  });
});

app.post("/contatos", (req, res) => {
  var contato = {
    nome: req.body.nome,
    email: req.body.email,
    fone: req.body.fone,
  };
  res.send({
    message: "Endpoint cadastro de contato / post",
    contatoEnviado: contato,
  });
});

app.put("/contatos/:idcontato", (req, res) => {
  var contato = {
    id: req.params.idcontato, //esse parametro id da pra pegar pelo "body ou params"
    nome: req.body.nome,
    email: req.body.email,
    fone: req.body.fone,
  };
  res.send({
    message: "Alteração de contato",
    contatoAlterado: contato,
  });
});

app.listen(port, () => {
  console.log(`Executando em http://localhost:${port}`);
});
