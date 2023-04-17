import clienteDAO from "../DAO/clienteDAO.js";
import cliente from "../models/cliente";

class clienteController {
  static rotas(app) {
    app.get("/cliente", clientecontroller.listar);
    app.post("/cliente", clientecontroller.inserir);
    app.delete("/cliente/:id", clientecontroller.deletar);
    app.put("/cliente/:id", clientecontroller.atualizar);
  }

  static async listar(req, res) {
    const cliente = await clienteDAO.listar();

    res.send(cliente);
  }

  static async inserir(req, res) {
    const cliente = {
      nome: req.body.nome,
      sobrenome: req.body.sobrenome,
      cpf: req.body.cpf,
      telefone: req.body.telefone,
      endereco: req.body.endereco,
      unidade: req.body.unidade,
    };

    const result = await clienteDAO.inserir(cliente);

    if (result.erro) {
      res.status(500).send(result);
    }

    res.send(result);
  }
  static async deletar(req, res) {
    const cliente = await clienteDAO.deletar(req.params.id);

    if (cliente.erro) {
      res.status(500).send("Erro ao deletar o registro");
    }

    res.send({ mensagem: "Registro removido com sucesso" });
  }

  static async atualizar(req, res) {
    const cliente = {
      nome: req.body.nome,
      sobrenome: req.body.sobrenome,
      cpf: req.body.cpf,
      telefone: req.body.telefone,
      endereco: req.body.endereco,
      unidade: req.body.unidade,
    };

    const result = await clienteDAO.atualizar(req.params.id, cliente);

    if (result.erro) {
      res.status(500).send("Erro ao atualizar o registro");
    }

    res.send({ mensagem: "Registro alterado com sucesso" });
  }
}

export default clienteController;
