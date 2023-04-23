import db from '../infra/db.js'

class pedidoDAO {
    static listar() {
        const query = 'SELECT * FROM PEDIDOS';
        return new Promise((resolve, reject) => {
            db.all(query, (err, rows) => {
                if (err) {
                    reject(err);
                }

                resolve(rows)
            });
        });
    }

    
    static buscarPorID(id) {
        const query = "SELECT * FROM PEDIDOS WHERE id_pedido = ?";
        return new Promise((resolve, reject) => {
          db.get(query, [id], (err, row) => {
            if (err) {
              reject(false);
            }
            resolve(row);
          });
        });
      }

    static inserir(pedido) {
        const query = 'INSERT INTO PEDIDOS (id_pedido, id_cliente, itens, valor) VALUES (?, ?, ?, ?)';
        return new Promise((resolve, reject) => {
            db.run(query, [pedido.id_pedido, pedido.id_cliente, pedido.itens, pedido.valor], function (err) {
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
        const query = 'DELETE FROM PEDIDOS WHERE id_pedido = ?';
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
        const query = 'UPDATE PEDIDOS SET id_cliente = ?, itens = ?, valor = ? WHERE id_pedido = ?';
        return new Promise((resolve, reject) => {
            db.run(query, [pedido.id_cliente, pedido.itens, pedido.valor, id], (err) => {
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