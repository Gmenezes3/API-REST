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
      id_unidade: req.body.id_unidade,
    };

    let result;
    try {
      result = await funcionarioDAO.inserir(funcionario);

    } catch (error) {
      res.status(500).send(result);
      return
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
    // verifica se o funcionario existe antes de atualizá-lo
    const funcionarioExistente = await funcionarioDAO.buscarPorID(req.params.id);
    if (!funcionarioExistente) {
      res.status(404).send({ mensagem: "Funcionario não encontrado" });
      return;
    }
    const funcionario = {
      id: req.body.id,
      nome: req.body.nome,
      sobrenome: req.body.sobrenome,
      cpf: req.body.cpf,
      telefone: req.body.telefone,
      endereco: req.body.endereco,
      id_unidade: req.body.id_unidade,
    };

    const result = await funcionarioDAO.atualizar(req.params.id, funcionario);

    if (result.erro) {
      res.status(500).send("Erro ao atualizar o registro");
    }

    res.send({ mensagem: "Registro alterado com sucesso" });
  }
}

export default funcionarioController;
