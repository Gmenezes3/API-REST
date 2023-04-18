import db from '../infra/db.js'

class produtoDAO {
    static listar() {
        const query = 'SELECT * FROM PRODUTOS';
        return new Promise((resolve, reject) => {
            db.all(query, (err, rows) => {
                if (err) {
                    reject(err);
                }

                resolve(rows)
            });
        });
    }

    static inserir(produto) {
        const query = 'INSERT INTO funcionarios (id, nome, fornecedor, unidade, quantidade, preco ) VALUES (?, ?, ?, ?, ?, ?)';
        return new Promise((resolve, reject) => {
            db.run(query, [produto.id, produto.nome, produto.fornecedor, produto.unidade, produto.quantidade, produto.preco], function (err) {
                if (err) {
                    reject({
                        mensagem: 'Erro ao inserir o registro',
                        erro: err
                    })
                }

                resolve({
                    mensagem: 'Registro criado com sucesso',
                    data: this.lastID
                })
            });
        });
    }
    static deletar(id) {
        const query = 'DELETE FROM PRODUTOS WHERE id = ?';
        return new Promise((resolve, reject) => {
            db.run(query, [id], (err) => {
                if (err) {
                    reject({
                        mensagem: 'Erro ao deletar o registro',
                        erro: err
                    })
                }

                resolve({ mensagem: 'Registro deletado com sucesso' })
            });
        });
    }
    static atualizar(id, produto) {
        const query = 'UPDATE produtos SET nome = ?, fornecedor = ?, unidade = ?, quantidade = ?, preco =? WHERE id = ?';
        return new Promise((resolve, reject) => {
            db.run(query, [produto.id, produto.nome, produto.fornecedor, produto.unidade, produto.quantidade, produto.preco, id], (err) => {
                if (err) {
                    reject({
                        mensagem: 'Erro ao atualizar o registro',
                        erro: err
                    })
                }

                resolve({ mensagem: 'Registro atualizado com sucesso' })
            });
        });
    }
}

export default produtoDAO;