const express = require("express");
const router = express.Router();

// router.get("/", (req, res) => {
//   res.send("Olá Mundo");
// });

router.get("/", (req, res) => {
  res.send("Pagina de usuarios");
});

router.post("/", (req, res) => {
  res.send("Pagina de cadastro de usuarios");
});

router.put("/:idusuario", (req, res) => {
  res.send(`Alterando o usuario ${req.params.idusuario}`);
});

module.exports = router;
