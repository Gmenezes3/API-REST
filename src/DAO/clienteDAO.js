import db from '../infra/db.js'

class clienteDAO {
    static listar() {
        const query = 'SELECT * FROM cliente';
        return new Promise((resolve, reject) => {
            db.all(query, (err, rows) => {
                if (err) {
                    reject(err);
                }

                resolve(rows)
            });
        });
    }

    static inserir(cliente) {
        const query = 'INSERT INTO cliente (nome, sobrenome, cpf, telefone, endereco, unidade) VALUES (?, ?, ?, ?, ?, ?)';
        return new Promise((resolve, reject) => {
            db.run(query, [cliente.nome, cliente.sobrenome, cliente.cpf, cliente.telefone, cliente.endereco, cliente.unidade], function (err) {
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
        const query = 'DELETE FROM clientes WHERE id = ?';
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
        const query = 'UPDATE clientes SET nome = ?, sobrenome = ?, cpf = ?, telefone = ?, endereco = ?, unidade =? WHERE id = ?';
        return new Promise((resolve, reject) => {
            db.run(query, [cliente.nome, cliente.sobrenome, cliente.cpf, cliente.telefone, cliente.endereco, cliente.unidade, id], (err) => {
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