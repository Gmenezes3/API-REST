import clienteDAO from "../DAO/clienteDAO.js"


class clienteController {
  static rotas(app) {
    app.get("/cliente", clienteController.listar);
    app.post("/cliente", clienteController.inserir);
    app.delete("/cliente/:id", clienteController.deletar);
    app.put("/cliente/:id", clienteController.atualizar);
  }

  static async listar(req, res) {
    const cliente = await clienteDAO.listar();

    res.send(cliente);
  }

  static async inserir(req, res) {
    const cliente = {
      id: req.body.id,
      nome: req.body.nome,
      cpf: req.body.cpf,
      telefone: req.body.telefone,
      endereco: req.body.endereco,
      unidade: req.body.unidade
    };
    
    let result;
    try {
      result = await clienteDAO.inserir(cliente);

    } catch (error) {
      res.status(500).send(result);
      return
    }
    res.send(result);
  }

  static async deletar(req, res) {
    const cliente = await clienteDAO.deletar(req.params.id_cliente);

    if (cliente.erro) {
      res.status(500).send("Erro ao deletar o registro");
    }

    res.send({ mensagem: "Registro removido com sucesso" });
  }

  static async atualizar(req, res) {
    const cliente = {
      id: req.body.id_cliente,
      nome: req.body.nome,
      cpf: req.body.cpf,
      telefone: req.body.telefone,
      endereco: req.body.endereco,
      unidade: req.body.id_unidade
    };

    const result = await clienteDAO.atualizar(req.params.id_cliente, cliente);

    if (result.erro) {
      res.status(500).send("Erro ao atualizar o registro");
    }

    res.send({ mensagem: "Registro alterado com sucesso" });
  }
}

export default clienteController;
