import db from '../infra/db.js'

class clienteDAO {
    static listar() {
        const query = 'SELECT * FROM CLIENTES';
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
        const query = "SELECT * FROM CLIENTES WHERE id_cliente = ?";
        return new Promise((resolve, reject) => {
          db.get(query, [id], (err, row) => {
            if (err) {
              reject(false);
            }
            resolve(row);
          });
        });
      }

    static inserir(cliente) {
        const query = 'INSERT INTO CLIENTES (id_cliente, nome, cpf, telefone, endereco, id_unidade) VALUES (?, ?, ?, ?, ?, ?)';
        return new Promise((resolve, reject) => {
            db.run(query, [cliente.id_cliente, cliente.nome, cliente.cpf, cliente.telefone, cliente.endereco, cliente.id_unidade], function (err) {
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
        const query = 'DELETE FROM CLIENTES WHERE id_cliente = ?';
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
    static atualizar(id, cliente) {
        const query = 'UPDATE CLIENTES SET nome = ?, cpf = ?, telefone = ?, endereco = ?, id_unidade = ? WHERE id_cliente = ?';
        return new Promise((resolve, reject) => {
            db.run(query, [cliente.nome, cliente.cpf, cliente.telefone, cliente.endereco, cliente.id_unidade, id], (err) => {
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

export default clienteDAO;