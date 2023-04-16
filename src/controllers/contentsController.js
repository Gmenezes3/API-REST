class contentsController {
    static rotas(app) {
        app.get('/funcionario', contentsController.listar)
        app.post('/funcionario', contentsController.inserir)
        app.delete('/funcionario', contentsController.deletar)
        app.put('/funcionario', contentsController.atualizar)
    }

    static async listar(req, res) {
        const funcionario = await ContentsDAO.listar()

        res.send(funcionario)
    }

    static async inserir(req, res) {
        const funcionario = {
            nome: req.body.nome,
            sobrenome: req.body.sobrenome,
            cpf: req.body.cpf,
            telefone: req.body.telefone,
            endereco: req.body.endereco,
            unidade: req.body.unidade,
        }

        const result = await ContentsDAO.inserir(funcionario)

        if (result.erro) {
            res.status(500).send(result)
        }

        res.send(result)
    }
    static async deletar(req, res) {
        const funcionario = await ContentsDAO.deletar(req.params.id)

        if (funcionario.erro) {
            res.status(500).send('Erro ao deletar o registro')
        }

        res.send({ mensagem: 'Registro removido com sucesso' })
    }

    static async atualizar(req, res) {
        const funcionario = {
            nome: req.body.nome,
            sobrenome: req.body.sobrenome,
            cpf: req.body.cpf,
            telefone: req.body.telefone,
            endereco: req.body.endereco,
            unidade: req.body.unidade,
        }

        const result = await ContentsDAO.atualizar(req.params.id, funcionario)

        if (result.erro) {
            res.status(500).send('Erro ao atualizar o registro')
        }

        res.send({ mensagem: 'Registro alterado com sucesso' })
    }
}

export default contentsController