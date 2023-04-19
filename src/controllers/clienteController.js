import clienteDAO from "../DAO/clienteDAO.js"


class clienteController {
  static rotas(app) {
    app.get("/cliente", clienteController.listar);
    app.get('/cliente/id/:id',clienteController.buscarPorID);
    app.post("/cliente", clienteController.inserir);
    app.delete("/cliente/:id", clienteController.deletar);
    app.put("/cliente/:id", clienteController.atualizar);
  }

  static async listar(req, res) {
    const cliente = await clienteDAO.listar();

    res.send(cliente);
  }

  static async buscarPorID(req, res) {
    const cliente = await clienteDAO.buscarPorID(req.params.id_cliente)
    if (!cliente) {
        res.status(404).send("Cliente não encontrado")
        return
    }
    res.status(200).send(cliente)
}

  static async inserir(req, res) {
    const cliente = {
      id: req.body.id_cliente,
      nome: req.body.nome,
      cpf: req.body.cpf,
      telefone: req.body.telefone,
      endereco: req.body.endereco,
      unidade: req.body.id_unidade
    };

    const result = await clienteDAO.inserir(cliente);

    if (result.erro) {
      res.status(500).send(result);
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
