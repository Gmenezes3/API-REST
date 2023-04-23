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
      id: req.body.id,
      nome: req.body.nome,
      id_produto: req.body.id_produto,
      cnpj: req.body.cnpj,
      telefone: req.body.telefone,
      endereco: req.body.endereco,
      id_unidade: req.body.id_unidade
    };

    let result;
    try {
      result = await fornecedorDAO.inserir(fornecedor);

    } catch (error) {
      res.status(500).send(result);
      return
    }
    res.send(result);
  }

  static async deletar(req, res) {
    const fornecedor = await fornecedorDAO.deletar(req.params.id);

    if (fornecedor.erro) {
      res.status(500).send("Erro ao deletar o registro");
    }

    res.send({ mensagem: "Registro removido com sucesso" });
  }

  static async atualizar(req, res) {
    // verifica se o fornecedor existe antes de atualizá-lo
    const fornecedorExistente = await fornecedorDAO.buscarPorID(req.params.id);
    if (!fornecedorExistente) {
      res.status(404).send({ mensagem: "Fornecedor não encontrado" });
      return;
    }
    const fornecedor = {
      id: req.body.id,
      nome: req.body.nome,
      id_produto: req.body.id_produto,
      cnpj: req.body.cnpj,
      telefone: req.body.telefone,
      endereco: req.body.endereco,
      id_unidade: req.body.id_unidade
    };

    const result = await fornecedorDAO.atualizar(req.params.id, fornecedor);

    if (result.erro) {
      res.status(500).send("Erro ao atualizar o registro");
    }

    res.send({ mensagem: "Registro alterado com sucesso" });
  }
}

export default fornecedorController;
