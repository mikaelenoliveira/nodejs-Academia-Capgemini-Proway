const express = require("express");
const pg = require("pg");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const app = express();
const cors = require("cors");

const port = process.env.PORT;

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const constStr = process.env.DATABASE_URL;
const pool = new pg.Pool({ connectionString: constStr });

app.post("/usuarios", (req, res) => {
  var usuario = {
    nome: req.body.nome,
    email: req.body.email,
    senha: req.body.senha,
    perfil: req.body.perfil,
  };
  pool.connect((err, client) => {
    if (err) {
      return res.status(401).send({
        message: "Conexão não autorizada",
      });
    }

    var sql = "select * from usuario  where email = $1";
    var dados = [req.body.email];
    client.query(sql, dados, (err, result) => {
      if (result.rowCount > 0) {
        return res.status(400).send({
          message: "Usuario já cadastrado",
        });
      } else {
        bcrypt.hash(req.body.senha, 10, (error, hash) => {
          if (error) {
            return res.status(500).send({
              message: "Erro de autenticação",
            });
          }
          var sql =
            "insert into usuario(nome,email,senha,perfil)values($1,$2,$3,$4)";
          var dados = [req.body.nome, req.body.email, hash, req.body.perfil];

          client.query(sql, dados, (error, result) => {
            if (error) {
              return res.status(500).send({
                message: "Erro ao inserir usuario",
              });
            }
            return res.status(201).send({
              message: "Usuario cadastrado com sucesso",
            });
          });
        });
      }
    });
  });
});

app.post("/usuarios/login", (req, res) => {
  pool.connect((err, client) => {
    if (err) {
      return res.status(401).send({
        message: "Conexão não autorizada",
      });
    }
    var sql = "select * from usuario  where email = $1";
    var dados = [req.body.email];
    client.query(sql, dados, (error, result) => {
      if (error) {
        return res.status(500).send({
          message: "Erro ao selecionar usuario",
        });
      }
      if (result.rowCount > 0) {
        bcrypt.compare(
          req.body.senha,
          result.rows[0].senha,
          (error, results) => {
            if (error) {
              return res.status(401).send({
                message: "Falha de autenticação",
              });
            }
            if (results) {
              //gerar token
              let token = jwt.sign(
                {
                  nome: result.rows[0].nome,
                  email: result.rows[0].email,
                  perfil: result.rows[0].perfil,
                },
                "segredo",
                { expiresIn: "1h" }
              );
              return res.status(200).send({
                message: "Conectado com sucesso",
                token: token,
              });
            }
            return res.status(401).send({
              message: "Senha não confere",
            });
          }
        );
      } else
        return res.status(404).send({
          message: "Usuario não encontrado ",
        });
    });
  });
});

app.listen(port, () => {
  console.log(`Executando em http:localhost:${port}`);
});
