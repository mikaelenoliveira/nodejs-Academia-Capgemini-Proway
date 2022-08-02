const express = require("express");
const productRoute = require("./produtoRoute.js");
const usuarioRoute = require("./usuarioRoute.js");
const app = express();
const port = process.env.PORT;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/produtos", productRoute);
app.use("/usuarios", usuarioRoute);

app.listen(port, () => {
  console.log(`Executando em http:localhost:${port}`);
});
