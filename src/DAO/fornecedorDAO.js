import db from '../infra/db.js'

class fornecedorDAO {
    static listar() {
        const query = 'SELECT * FROM fornecedor';
        return new Promise((resolve, reject) => {
            db.all(query, (err, rows) => {
                if (err) {
                    reject(err);
                }

                resolve(rows)
            });
        });
    }

    static inserir(fornecedor) {
        const query = 'INSERT INTO fornecedor (nome, sobrenome, cpf, telefone, endereco, unidade) VALUES (?, ?, ?, ?, ?, ?)';
        return new Promise((resolve, reject) => {
            db.run(query, [fornecedor.nome, fornecedor.sobrenome, fornecedor.cpf, fornecedor.telefone, fornecedor.endereco, fornecedor.unidade], function (err) {
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
        const query = 'DELETE FROM fornecedor WHERE id = ?';
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
    static atualizar(id, fornecedor) {
        const query = 'UPDATE fornecedor SET nome = ?, sobrenome = ?, cpf = ?, telefone = ?, endereco = ?, unidade =? WHERE id = ?';
        return new Promise((resolve, reject) => {
            db.run(query, [fornecedor.nome, fornecedor.sobrenome, fornecedor.cpf, fornecedor.telefone, fornecedor.endereco, fornecedor.unidade, id], (err) => {
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

export default fornecedorDAO;