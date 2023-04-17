import fornecedorDAO from "../DAO/fornecedorDAO.js";
import fornecedor from "../models/fornecedor.js";

class fornecedorController{
  static rotas(app) {
    app.get("/fornecedor", fornecedorControllerlistar);
    app.post("/fornecedor", fornecedorControllerinserir);
    app.delete("/fornecedor/:id", fornecedorControllerdeletar);
    app.put("/fornecedor/:id", fornecedorControlleratualizar);
  }

  static async listar(req, res) {
    const fornecedor = await fornecedorDAO.listar();

    res.send(fornecedor);
  }

  static async inserir(req, res) {
    const fornecedor = {
      nome: req.body.nome,
      sobrenome: req.body.sobrenome,
      cpf: req.body.cpf,
      telefone: req.body.telefone,
      endereco: req.body.endereco,
      unidade: req.body.unidade,
    };

    const result = await fornecedorDAO.inserir(fornecedor);

    if (result.erro) {
      res.status(500).send(result);
    }

    res.send(result);
  }
  static async deletar(req, res) {
    const fornecedor = await fornecedorDAO.deletar(req.params.id);

    if (fornecedor.erro) {
      res.status(500).send("Erro ao deletar o registro");
    }

    res.send({ mensagem: "Registro removido com sucesso" });
  }

  static async atualizar(req, res) {
    const fornecedor = {
      nome: req.body.nome,
      sobrenome: req.body.sobrenome,
      cpf: req.body.cpf,
      telefone: req.body.telefone,
      endereco: req.body.endereco,
      unidade: req.body.unidade,
    };

    const result = await fornecedorDAO.atualizar(req.params.id, fornecedor);

    if (result.erro) {
      res.status(500).send("Erro ao atualizar o registro");
    }

    res.send({ mensagem: "Registro alterado com sucesso" });
  }
}

export default fornecedorController
