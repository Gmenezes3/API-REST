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
      id_cliente: req.body.id_cliente,
      itens: req.body.itens,
      valor: req.body.valor
    };

    let result;
    try {
      result = await pedidoDAO.inserir(pedido);

    } catch (error) {
      res.status(500).send(result);
      return
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
     // verifica se o pedido existe antes de atualizá-lo
     const pedidoExistente = await pedidoDAO.buscarPorID(req.params.id);
     
     if (!pedidoExistente) {
       res.status(404).send({ mensagem: "Pedido não encontrado" });
       return;
     }
    const pedido = {
      id: req.body.id,
      id_cliente: req.body.id_cliente,
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
