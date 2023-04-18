import pedidoDAO from "../DAO/pedidoDAO.js";


class pedidoController {
  static rotas(app) {
    app.get("/pedido", pedidoController.listar);
    app.post("/pedido", pedidoController.inserir);
    app.delete("/pedido/:id", pedidoController.deletar);
    app.put("/pedido/:id", pedidoController.atualizar);
  }

  static async listar(req, res) {
    const pedido = await pedidoDAO.listar();

    res.send(pedido);
  }

  static async inserir(req, res) {
    const pedido = {
      id: req.body.id,
      cliente: req.body.cliente,
      cpf: req.body.cpf,
      telefone: req.body.telefone,
      endereco: req.body.endereco,
      unidade: req.body.unidade,
      itens: req.body.itens,
      valor: req.body.valor
    };

    const result = await pedidoDAO.inserir(pedido);

    if (result.erro) {
      res.status(500).send(result);
    }

    res.send(result);
  }
  static async deletar(req, res) {
    const pedido = await pedidoDAO.deletar(req.params.id);

    if (pedido.erro) {
      res.status(500).send("Erro ao deletar o registro");
    }

    res.send({ mensagem: "Registro removido com sucesso" });
  }

  static async atualizar(req, res) {
    const pedido = {
      id: req.body.id,
      cliente: req.body.cliente,
      cpf: req.body.cpf,
      telefone: req.body.telefone,
      endereco: req.body.endereco,
      unidade: req.body.unidade,
      itens: req.body.itens,
      valor: req.body.valor
    };

    const result = await pedidoDAO.atualizar(req.params.id, pedido);

    if (result.erro) {
      res.status(500).send("Erro ao atualizar o registro");
    }

    res.send({ mensagem: "Registro alterado com sucesso" });
  }
}

export default pedidoController;
