import unidadeDAO from "../DAO/unidadeDAO.js";

class unidadeController {
  static rotas(app) {
    app.get("/unidade", unidadeController.listar);
    app.post("/unidade", unidadeController.inserir);
    app.delete("/unidade/:id", unidadeController.deletar);
    app.put("/unidade/:id", unidadeController.atualizar);
  }

  static async listar(req, res) {
    const unidade = await unidadeDAO.listar();

    res.send(unidade);
  }

  static async inserir(req, res) {
    const unidade = {
      id: req.body.id,
      unidade: req.body.unidade,
      cnpj: req.body.cnpj,
      telefone: req.body.telefone,
      endereco: req.body.endereco,
    };

    let result;
    try {
      result = await unidadeDAO.inserir(unidade);

    } catch (error) {
      res.status(500).send(result);
      return
    }
    res.send(result);
  }

  static async deletar(req, res) {
    const unidade = await unidadeDAO.deletar(req.params.id);

    if (unidade.erro) {
      res.status(500).send("Erro ao deletar o registro");
    }

    res.send({ mensagem: "Registro removido com sucesso" });
  }

  static async atualizar(req, res) {
      // verifica se o unidade existe antes de atualizá-lo
      const unidadeExistente = await unidadeDAO.buscarPorID(req.params.id);
     
      if (!unidadeExistente) {
        res.status(404).send({ mensagem: "Unidade não encontrada" });
        return;
      }

    const unidade = {
      id: req.body.id,
      unidade: req.body.unidade,
      cnpj: req.body.cnpj,
      telefone: req.body.telefone,
      endereco: req.body.endereco,
    };

    const result = await unidadeDAO.atualizar(req.params.id, unidade);

    if (result.erro) {
      res.status(500).send("Erro ao atualizar o registro");
    }

    res.send({ mensagem: "Registro alterado com sucesso" });
  }
}

export default unidadeController;