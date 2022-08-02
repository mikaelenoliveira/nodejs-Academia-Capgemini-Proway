const express = require("express");
const router = express.Router();

// router.get("/", (req, res) => {
//   res.send("Olá Mundo");
// });

router.get("/", (req, res) => {
  res.send("Pagina de clientes");
});

router.post("/", (req, res) => {
  var cliente = {
    id: req.body.id,
    nome: req.body.nome,
    email: req.body.email,
  };
  res.send({
    message: "Pagina de cadastro de clientes",
    cliente: cliente,
  });
});

router.put("/:idcliente", (req, res) => {
  res.send(`Alterando o cliente ${req.params.idcliente}`);
});

module.exports = router;
