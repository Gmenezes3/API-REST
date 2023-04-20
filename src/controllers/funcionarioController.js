import funcionarioDAO from "../DAO/funcionarioDAO.js";


class funcionarioController {
  static rotas(app) {
    app.get("/funcionario", funcionarioController.listar);
    app.post("/funcionario", funcionarioController.inserir);
    app.delete("/funcionario/:id", funcionarioController.deletar);
    app.put("/funcionario/:id", funcionarioController.atualizar);
  }

  static async listar(req, res) {
    const funcionario = await funcionarioDAO.listar();

    res.send(funcionario);
  }

  static async inserir(req, res) {
    const funcionario = {
      id: req.body.id,
      nome: req.body.nome,
      sobrenome: req.body.sobrenome,
      cpf: req.body.cpf,
      telefone: req.body.telefone,
      endereco: req.body.endereco,
      unidade: req.body.unidade,
    };

    const result = await funcionarioDAO.inserir(funcionario);

    if (result.erro) {
      res.status(500).send(result);
    }

    res.send(result);
  }
  static async deletar(req, res) {
    const funcionario = await funcionarioDAO.deletar(req.params.id);

    if (funcionario.erro) {
      res.status(500).send("Erro ao deletar o registro");
    }

    res.send({ mensagem: "Registro removido com sucesso" });
  }

  static async atualizar(req, res) {
    const funcionario = {
      id: req.body.id,
      nome: req.body.nome,
      sobrenome: req.body.sobrenome,
      cpf: req.body.cpf,
      telefone: req.body.telefone,
      endereco: req.body.endereco,
      unidade: req.body.unidade,
    };

    const result = await funcionarioDAO.atualizar(req.params.id, funcionario);

    if (result.erro) {
      res.status(500).send("Erro ao atualizar o registro");
    }

    res.send({ mensagem: "Registro alterado com sucesso" });
  }
}

export default funcionarioController;
