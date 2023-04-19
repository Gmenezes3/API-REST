import db from '../infra/db.js'

class UnidadeDAO {
    static listar() {
        const query = 'SELECT * FROM unidades';
        return new Promise((resolve, reject) => {
            db.all(query, (err, rows) => {
                if (err) {
                    reject(err);
                }

                resolve(rows)
            });
        });
    }

    static inserir(unidade) {
        const query = 'INSERT INTO unidades (id_unidade, unidade, cnpj, telefone, endereco) VALUES (?, ?, ?, ?, ?)';
        return new Promise((resolve, reject) => {
            db.run(query, [unidade.id_unidade, unidade.unidade, unidade.cnpj, unidade.telefone, unidade.endereco], function (err) {
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
        const query = 'DELETE FROM unidades WHERE id_unidade = ?';
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

    static atualizar(id, unidade) {
        const query = 'UPDATE unidades SET unidade = ?, cnpj = ?, telefone = ?, endereco = ? WHERE id_unidade = ?';
        return new Promise((resolve, reject) => {
            db.run(query, [unidade.unidade, unidade.cnpj, unidade.telefone, unidade.endereco, id], (err) => {
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

export default UnidadeDAO;