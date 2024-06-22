import express from "express";
import cors from "cors";
import { createRequire } from "module";
const require = createRequire(import.meta.url);

const app = express();

app.use(cors(), express.json());

app.get("/", (req, res) => {
  res.send("Olá, mundo");
});

app.get("/sobre", (req, res) => {
  res.send("Esta é a página sobre");
});

app.get("/tarefas", async (req, res) => {
  const tarefas = require("./public/tarefas.json");

  res.json(tarefas);
});

app.post("/novaTarefa", (req, res) => {
  res.send({ message: "A requisição POST para /novaTarefa chegou" });
});

app.listen(3000, () => {
  console.log("Servidor rodando em http://localhost:3000");
});

app.use(express.static("public"));
