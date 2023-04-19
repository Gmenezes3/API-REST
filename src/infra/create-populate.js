import db from "./db.js";
import sqlite3  from "sqlite3";

//Tabela Clientes

sqlite3.verbose()

const CLIENTES_SCHEMA = `
CREATE TABLE IF NOT EXISTS "CLIENTES" (
    ID_CLIENTE INTEGER PRIMARY KEY AUTOINCREMENT,
    NOME VARCHAR(64),
    CPF INTEGER,
    TELEFONE INTEGER,
    ENDERECO VARCHAR(64),
    ID_UNIDADE INTEGER,

    FOREIGN KEY(ID_UNIDADE) REFERENCES UNIDADES(ID_UNIDADE)
  );`;

const ADD_CLIENTES_DATA = `
  INSERT INTO CLIENTES (NOME, CPF, TELEFONE, ENDERECO, ID_UNIDADE) 
  VALUES
    ('Luciano Peixoto', '15478945765', '21984561265', 'Rua Piracanjuba 98', '1'),
    ('Isabele Pereira', '15943217923', '11965782436', 'Rua Oscar Freire 157', '2'),
    ('Pedro Henrique', '65784563247', '21965234851', 'Avenida Rio Branco 1574', '1')
    `;

function createTableClientes() {
    db.run(CLIENTES_SCHEMA, (error) => {
        if (error) console.log("Erro ao criar tabela de clientes");
    });
}

function populaTabelaClientes() {
    db.run(ADD_CLIENTES_DATA, (error) => {
        if (error) console.log("Erro ao popular tabela de clientes");
    });
}

//Tabela fornecedores

const FORNECEDORES_SCHEMA = `
CREATE TABLE IF NOT EXISTS "FORNECEDORES" (
    ID_FORNECEDOR INTEGER PRIMARY KEY AUTOINCREMENT,
    NOME VARCHAR(64),
    ID_PRODUTO INTEGER,
    CNPJ VARCHAR(64),
    TELEFONE INTEGER,
    ENDERECO VARCHAR(64),
    ID_UNIDADE VARCHAR(64),

    FOREIGN KEY(ID_PRODUTO) REFERENCES PRODUTOS(ID_PRODUTO),
    FOREIGN KEY(ID_UNIDADE) REFERENCES UNIDADES(ID_UNIDADE)
  );`;

const ADD_FORNECEDORES_DATA = `
  INSERT INTO FORNECEDORES (NOME, ID_PRODUTO, CNPJ, TELEFONE, ENDERECO, ID_UNIDADE) 
  VALUES
    ('Dail Distribuidora', '1', '12.345.678/0001-00', '11947575989', 'Avenida Pires do Rio, 905', '2'),
    ('QUEENS BREAD', '2', '52.215.754/0002-10', '11986521435','Rua Gáspar de Lemos, 260', '2'),
    ('Exímia Comércio de Bebidas', '3', '54.110.841/0005-00', '11974234851', 'Rua da Consolação 2590,', '2'),
    ('Rio Quality', '4', '26.543.867/0002-00', '21984563214', 'Rua Embau 508', '1'),
    ('BREAD MAKER', '5', '45.305.678/0005-00', '21971042564', 'Rua Tiradendes 1458', '1')
    `;

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

// Funcionario
const FUNCIONARIOS_SCHEMA = `
CREATE TABLE IF NOT EXISTS "FUNCIONARIOS" (
    ID_FUNCIONARIO INTEGER PRIMARY KEY AUTOINCREMENT,
    NOME VARCHAR(64),
    SOBRENOME VARCHAR(64),
    CPF INTEGER,
    TELEFONE INTEGER,
    ENDERECO VARCHAR(64),
    ID_UNIDADE INTEGER,

    FOREIGN KEY(ID_UNIDADE) REFERENCES UNIDADES(ID_UNIDADE)
  );`;

const ADD_FUNCIONARIOS_DATA = `
INSERT INTO FUNCIONARIOS (NOME, SOBRENOME, CPF, TELEFONE, ENDERECO, ID_UNIDADE) 
VALUES
  ('William','Firmino', '15478945845', '21984564578', 'Avenida Meriti 100', '1'),
  ('Mirela', 'Santos', '78954121723', '21978652436', 'Rua Mansoaba 356', '1'),
  ('Alice', 'Vieira', '65784785247', '21964529851', 'Avenida Pastor Marthin Luther King 120', '1'),
  ('Gabriela','Lopez', '24536120456', '11987459621', 'Avenida Paulista 200', '2'),
  ('Lucas', 'Rodrigues', '26547895621', '11958462784', 'Rua Coronel Oscar Porto 35', '2'),
  ('Paulo', 'Andrade', '65784747123', '11964565851', 'Rua Itapeva 36', '2');
`;

function createTableFuncionarios() {
    db.run(FUNCIONARIOS_SCHEMA, (error) => {
        if (error) console.log("Erro ao criar tabela de funcionarios");
    });
}

function populaTabelaFuncionarios() {
    db.run(ADD_FUNCIONARIOS_DATA, (error) => {
        if (error) console.log("Erro ao popular tabela de funcionarios");
    });
}

const PEDIDOS_SCHEMA = `
CREATE TABLE IF NOT EXISTS "PEDIDOS" (
    ID_PEDIDO INTEGER PRIMARY KEY AUTOINCREMENT,
    ID_CLIENTE INTEGER,
    ITENS VARCHAR(256),
    VALOR REAL,

    FOREIGN KEY(ID_CLIENTE) REFERENCES CLIENTES(ID_CLIENTE)
);`;

const ADD_PEDIDOS_DATA = `
  INSERT INTO PEDIDOS (ID_CLIENTE, ITENS, VALOR) 
  VALUES
    ('1', 'x-BURGUER, COCA COLA LATA', '15.00'),
    ('2', 'X-TUDO, X-PICANHA, GUARANA ANTARTICA 2L', '45.00'),
    ('3', 'X-CALABRESA, GUARAVITA', '15.00')
`;

function createTablePedidos() {
    db.run(PEDIDOS_SCHEMA, (error) => {
        if (error) console.log("Erro ao criar tabela de Pedidos");
    });
}

function populaTabelaPedidos() {
    db.run(ADD_PEDIDOS_DATA, (error) => {
        if (error) console.log("Erro ao popular tabela de Pedidos");
    });
}


const PRODUTOS_SCHEMA = `
CREATE TABLE IF NOT EXISTS "PRODUTOS" (
    ID_PRODUTO INTEGER PRIMARY KEY AUTOINCREMENT,
    NOME VARCHAR(64),
    ID_FORNECEDOR INTEGER,
    PRECO REAL,

    FOREIGN KEY(ID_FORNECEDOR) REFERENCES FORNECEDORES(ID_FORNECEDOR)
  );`;
const ADD_PRODUTOS_DATA = `
  INSERT INTO PRODUTOS (NOME, ID_FORNECEDOR, PRECO) 
  VALUES
    ('Hamburguer', '1', '450'),
    ('Pão', '2', '300'),
    ('Refrigerante', '3', '500'),
    ('Hamburguer', '4', '700'),
    ('Pão', '5', '500')
    `;


function createTableProdutos() {
    db.run(PRODUTOS_SCHEMA, (error) => {
        if (error) console.log("Erro ao criar tabela de Produtos");
    });
}

function populaTabelaProdutos() {
    db.run(ADD_PRODUTOS_DATA, (error) => {
        if (error) console.log("Erro ao popular tabela de Produtos");
    });
}

const UNIDADES_SCHEMA = `
CREATE TABLE IF NOT EXISTS "UNIDADES" (
    ID_UNIDADE INTEGER PRIMARY KEY AUTOINCREMENT,
    UNIDADE VACHAR(64),
    CNPJ VARCHAR(64),
    TELEFONE INTEGER,
    ENDERECO VARCHAR(64)


  );`;

  const ADD_UNIDADES_DATA = `
  INSERT INTO UNIDADES ( UNIDADE, CNPJ, TELEFONE, ENDERECO) 
  VALUES
    ('Rio de Janeiro', '25.345.678/0005-00', '2145698216', 'Rua 24 de Maio 543'),
    ('São Paulo', '25.345.678/0005-00', '11975421435','Avenida Paulista 125')
`;
function createTableUnidades() {
    db.run(UNIDADES_SCHEMA, (error) => {
        if (error) console.log("Erro ao criar tabela de unidades");
    });
}

function populaTabelaUnidades() {
    db.run(ADD_UNIDADES_DATA, (error) => {
        if (error) console.log("Erro ao popular tabela de unidades");
    });
}



db.serialize(() => {
    createTableClientes();
    populaTabelaClientes();
    createTableFornecedores();
    populaTabelaFornecedores();
    createTableFuncionarios();
    populaTabelaFuncionarios();
    createTablePedidos();
    populaTabelaPedidos();
    createTableProdutos();
    populaTabelaProdutos();
    createTableUnidades();
    populaTabelaUnidades();

});

