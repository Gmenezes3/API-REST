import db from "./db.js";

//Tabela Clientes

const CLIENTES_SCHEMA = `
CREATE TABLE IF NOT EXISTS "CLIENTE" (
    "ID" INTEGER PRIMARY KEY AUTOINCREMENT,
    "NOME" varchar(64),
    "CPF" INTEGER,
    "TELEFONE" INTEGER,
    "ENDERECO" varchar(64),
    "UNIDADE" varchar(64)
  );`;

const ADD_CLIENTES_DATA = `
  INSERT INTO CLIENTES (NOME, CPF, TELEFONE, ENDERECO, UNIDADE) 
  VALUES
    ('Luciano Peixoto', '15478945765', '21984561265', 'Rua Piracanjuba 98', 'Rio de Janeiro'),
    ('Isabele Pereira', '15943217923', '11965782436', 'Rua Oscar Freire 157', 'São Paulo'),
    ('Pedro Henrique', '65784563247', '21965234851', 'Avenida Rio Branco 1574', 'Rio de Janeiro'),
    `

function createTableCliente() {
    db.run(CLIENTES_SCHEMA, (error) => {
        if (error) console.log("Erro ao criar tabela de clientes");
    });
}

function populaTabelaCliente() {
    db.run(ADD_CLIENTES_DATA, (error) => {
        if (error) console.log("Erro ao popular tabela de clientes");
    });
}

//Tabela fornecedores

const FORNECEDORES_SCHEMA = `
CREATE TABLE IF NOT EXISTS "FORNECEDORES" (
    "ID" INTEGER PRIMARY KEY AUTOINCREMENT,
    "NOME" varchar(64),
    "NOME_PRODUTO" varchar(64),
    "CNPJ" INTEGER,
    "TELEFONE" INTEGER,
    "ENDERECO" varchar(64),
    "UNIDADE" varchar(64)
  );`;

const ADD_FORNECEDORES_DATA = `
  INSERT INTO FORNECEDORES (NOME, NOME_PRODUTO, CNPJ, TELEFONE, ENDERECO, UNIDADE) 
  VALUES
    ('Dail Distribuidora', 'Hambúrguer', '12.345.678/0001-00', '(11947575989', 'Avenida Pires do Rio, 905', 'São Paulo'),
    ('QUEENS BREAD', 'Pão', '52.215.754/0002-10', '11986521435','Rua Gáspar de Lemos, 260', 'São Paulo'),
    ('Exímia Comércio de Bebidas', 'Bebidas', '54.110.841/0005-00', '11974234851', 'Rua da Consolação 2590,', 'São Paulo'),
    ('Rio Quality', 'Hamúrguer', '26.543.867/0002-00', '21984563214', 'Rua Embau 508', 'Rio de Janeiro'),
    ('BREAD MAKER', 'Pao', '45.305.678/0005-00', '21971042564', 'Rua Tiradendes 1458', 'Rio de Janeiro'),
    `

function createTableFornecedores() {
    db.run(FORNECEDORES_SCHEMA, (error) => {
        if (error) console.log("Erro ao criar tabela de fornecedores");
    });
}

function populaTabelaFornecedores() {
    db.run(ADD_FORNECEDORES_DATA, (error) => {
        if (error) console.log("Erro ao popular tabela de fornecedores");
    });
}




db.serialize(() => {
    createTableCliente();
    populaTabelaCliente();
    createTableFornecedores();
    populaTabelaFornecedores();
});

