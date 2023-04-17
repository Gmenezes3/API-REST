import db from '../infra/db.js'

class clienteDAO {
    static listar() {
        const query = 'SELECT * FROM funcionarios';
        return new Promise((resolve, reject) => {
            db.all(query, (err, rows) => {
                if (err) {
                    reject(err);
                }

                resolve(rows)
            });
        });
    }

    static inserir(funcionario) {
        const query = 'INSERT INTO funcionarios (nome, sobrenome, cpf, telefone, endereco, unidade) VALUES (?, ?, ?, ?, ?, ?)';
        return new Promise((resolve, reject) => {
            db.run(query, [funcionario.nome, funcionario.sobrenome, funcionario.cpf, funcionario.telefone, funcionario.endereco, funcionario.unidade], function (err) {
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
        const query = 'DELETE FROM funcionarios WHERE id = ?';
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
        const query = 'UPDATE funcionarios SET nome = ?, sobrenome = ?, cpf = ?, telefone = ?, endereco = ?, unidade =? WHERE id = ?';
        return new Promise((resolve, reject) => {
            db.run(query, [funcionario.nome, funcionario.sobrenome, funcionario.cpf, funcionario.telefone, funcionario.endereco, funcionario.unidade, id], (err) => {
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

export default ContentsDAO;