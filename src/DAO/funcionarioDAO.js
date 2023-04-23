import db from '../infra/db.js'

class funcionarioDAO {
    static listar() {
        const query = 'SELECT * FROM FUNCIONARIOS';
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
        const query = "SELECT * FROM FUNCIONARIOS WHERE id_funcionario = ?";
        return new Promise((resolve, reject) => {
          db.get(query, [id], (err, row) => {
            if (err) {
              reject(false);
            }
            resolve(row);
          });
        });
      }

    static inserir(funcionario) {
        const query = 'INSERT INTO funcionarios (id_funcionario, nome, sobrenome, cpf, telefone, endereco, id_unidade) VALUES (?, ?, ?, ?, ?, ?, ?)';
        return new Promise((resolve, reject) => {
            db.run(query, [funcionario.id_funcionario, funcionario.nome, funcionario.sobrenome, funcionario.cpf, funcionario.telefone, funcionario.endereco, funcionario.id_unidade], function (err) {
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
        const query = 'DELETE FROM funcionarios WHERE id_funcionario = ?';
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
    static atualizar(id, funcionario) {
        const query = 'UPDATE FUNCIONARIOS SET nome = ?, sobrenome = ?, cpf = ?, telefone = ?, endereco = ?, id_unidade =? WHERE id_funcionario = ?';
        return new Promise((resolve, reject) => {
            db.run(query, [funcionario.nome, funcionario.sobrenome, funcionario.cpf, funcionario.telefone, funcionario.endereco, funcionario.id_unidade, id], (err) => {
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

export default funcionarioDAO;