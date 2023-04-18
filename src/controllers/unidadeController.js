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
      nome: req.body.nome,
      cnpj: req.body.cnpj,
      telefone: req.body.telefone,
      endereco: req.body.endereco,
    };

    const result = await ContentsDAO.inserir(unidade);

    if (result.erro) {
      res.status(500).send(result);
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
    const unidade = {
      nome: req.body.nome,
      sobrenome: req.body.sobrenome,
      cpf: req.body.cpf,
      telefone: req.body.telefone,
      endereco: req.body.endereco,
      unidade: req.body.unidade,
    };

    const result = await ContentsDAO.atualizar(req.params.id, unidade);

    if (result.erro) {
      res.status(500).send("Erro ao atualizar o registro");
    }

    res.send({ mensagem: "Registro alterado com sucesso" });
  }
}

export default unidadeController;
