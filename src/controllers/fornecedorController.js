import fornecedorDAO from "../DAO/fornecedorDAO.js";


class fornecedorController {
  static rotas(app) {
    app.get("/fornecedor", fornecedorController.listar);
    app.post("/fornecedor", fornecedorController.inserir);
    app.delete("/fornecedor/:id", fornecedorController.deletar);
    app.put("/fornecedor/:id", fornecedorController.atualizar);
  }

  static async listar(req, res) {
    const fornecedor = await fornecedorDAO.listar();

    res.send(fornecedor);
  }

  static async inserir(req, res) {
    const fornecedor = {
      id: req.body.id_fornecedor,
      nome: req.body.nome,
      produto: req.body.id_produto,
      cnpj: req.body.cnpj,
      telefone: req.body.telefone,
      endereco: req.body.endereco,
      unidade: req.body.id_unidade
    };

    const result = await fornecedorDAO.inserir(fornecedor);

    if (result.erro) {
      res.status(500).send(result);
    }

    res.send(result);
  }
  static async deletar(req, res) {
    const fornecedor = await fornecedorDAO.deletar(req.params.id_fornecedor);

    if (fornecedor.erro) {
      res.status(500).send("Erro ao deletar o registro");
    }

    res.send({ mensagem: "Registro removido com sucesso" });
  }

  static async atualizar(req, res) {
    const fornecedor = {
      id: req.body.id_fornecedor,
      nome: req.body.nome,
      produto: req.body.id_produto,
      cnpj: req.body.cnpj,
      telefone: req.body.telefone,
      endereco: req.body.endereco,
      unidade: req.body.id_unidade
    };

    const result = await fornecedorDAO.atualizar(req.params.id_fornecedor, fornecedor);

    if (result.erro) {
      res.status(500).send("Erro ao atualizar o registro");
    }

    res.send({ mensagem: "Registro alterado com sucesso" });
  }
}

export default fornecedorController;
