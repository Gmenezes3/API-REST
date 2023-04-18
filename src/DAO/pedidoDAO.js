import db from '../infra/db.js'

class pedidoDAO {
    static listar() {
        const query = 'SELECT * FROM pedido';
        return new Promise((resolve, reject) => {
            db.all(query, (err, rows) => {
                if (err) {
                    reject(err);
                }

                resolve(rows)
            });
        });
    }

    static inserir(pedido) {
        const query = 'INSERT INTO pedido (id, cliente, cpf, valor, endereco, unidade,itens) VALUES (?, ?, ?, ?, ?, ?,?)';
        return new Promise((resolve, reject) => {
            db.run(query, [pedido.id, pedido.cliente, pedido.cpf, pedido.valor, pedido.endereco, pedido.unidade, pedido.itens], function (err) {
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
        const query = 'DELETE FROM pedido WHERE id = ?';
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
    static atualizar(id, pedido) {
        const query = 'UPDATE pedido SET id = ?, cliente = ?, cpf = ?, valor = ?, endereco = ?, unidade =? itens = ?,  ';
        return new Promise((resolve, reject) => {
            db.run(query, [pedido.id, pedido.cliente, pedido.cpf, pedido.valor, pedido.endereco, pedido.unidade, pedido.itens], (err) => {
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

export default pedidoDAO;