const express = require("express");
const app = express();
const clientes = require("./clientes");
const usuarios = require("./usuarios");
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//ultimos midllewares
app.use("/clientes", clientes);
app.use("/usuarios", usuarios);

app.listen(process.env.PORT || 8080, () => console.log("Servidor executando"));
