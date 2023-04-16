/*
Esse arquivo deve ser executado apenas uma vez para que a tabela do banco seja criada
*/
import db from "./db.js";

//==== TABELA DE FUNCIONARIOS
const CONTENTS_SCHEMA = `
  CREATE TABLE IF NOT EXISTS "funcionarios" (
      "ID" INTEGER PRIMARY KEY AUTOINCREMENT,
      "NOME" varchar(64),
      "SOBRENOME" varchar(64),
      "CPF" INTEGER,
      "TELEFONE" INTEGER,
      "ENDERECO" varchar(64),
      "UNIIDADE" varchar(64)
    );`;

function createTableContents() {
    db.run(CONTENTS_SCHEMA, (error) => {
        if (error) console.log("Erro ao criar tabela de funcionarios");
    });
}

db.serialize(() => {
    createTableContents();
});