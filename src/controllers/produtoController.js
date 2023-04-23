import produtoDAO from "../DAO/produtoDAO.js";


class produtoController {
  static rotas(app) {
    app.get("/produto", produtoController.listar);
    app.post("/produto", produtoController.inserir);
    app.delete("/produto/:id", produtoController.deletar);
    app.put("/produto/:id", produtoController.atualizar);
  }

  static async listar(req, res) {
    const produto = await produtoDAO.listar();

    res.send(produto);
  }

  static async inserir(req, res) {
    const produto = {
      id: req.body.id,
      nome: req.body.nome,
      id_fornecedor: req.body.id_fornecedor,
      preco: req.body.preco
    };

    let result;
    try {
      result = await produtoDAO.inserir(produto);

    } catch (error) {
      res.status(500).send(result);
      return
    }
    res.send(result);
  }

  static async deletar(req, res) {
    const produto = await produtoDAO.deletar(req.params.id);

    if (produto.erro) {
      res.status(500).send("Erro ao deletar o registro");
    }

    res.send({ mensagem: "Registro removido com sucesso" });
  }

  static async atualizar(req, res) {
    // verifica se o produto existe antes de atualizá-lo
    const produtoExistente = await produtoDAO.buscarPorID(req.params.id);
    
    if (!produtoExistente) {
      res.status(404).send({ mensagem: "Produto não encontrado" });
      return;

    }
    const produto = {
      id: req.body.id,
      nome: req.body.nome,
      id_fornecedor: req.body.id_fornecedor,
      preco: req.body.preco
    };

    const result = await produtoDAO.atualizar(req.params.id, produto);

    if (result.erro) {
      res.status(500).send("Erro ao atualizar o registro");
    }

    res.send({ mensagem: "Registro alterado com sucesso" });
  }
}

export default produtoController;
