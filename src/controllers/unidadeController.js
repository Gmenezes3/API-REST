import unidadeDAO from "../DAO/unidadeDAO.js";
import unidade from "../models/unidade";

class unidadeController {
  static rotas(app) {
    app.get("/pedido", unidadeController.listar);
    app.post("/pedido", unidadeController.inserir);
    app.delete("/pedido/:id", unidadeController.deletar);
    app.put("/pedido/:id", unidadeController.atualizar);
  }

  static async listar(req, res) {
    const pedido = await ContentsDAO.listar();

    res.send(pedido);
  }

  static async inserir(req, res) {
    const pedido = {
      nome: req.body.nome,
      sobrenome: req.body.sobrenome,
      cpf: req.body.cpf,
      telefone: req.body.telefone,
      endereco: req.body.endereco,
      unidade: req.body.unidade,
    };

    const result = await ContentsDAO.inserir(pedido);

    if (result.erro) {
      res.status(500).send(result);
    }

    res.send(result);
  }
  static async deletar(req, res) {
    const pedido = await ContentsDAO.deletar(req.params.id);

    if (pedido.erro) {
      res.status(500).send("Erro ao deletar o registro");
    }

    res.send({ mensagem: "Registro removido com sucesso" });
  }

  static async atualizar(req, res) {
    const pedido = {
      nome: req.body.nome,
      sobrenome: req.body.sobrenome,
      cpf: req.body.cpf,
      telefone: req.body.telefone,
      endereco: req.body.endereco,
      unidade: req.body.unidade,
    };

    const result = await ContentsDAO.atualizar(req.params.id, pedido);

    if (result.erro) {
      res.status(500).send("Erro ao atualizar o registro");
    }

    res.send({ mensagem: "Registro alterado com sucesso" });
  }
}

export default unidadeController;
