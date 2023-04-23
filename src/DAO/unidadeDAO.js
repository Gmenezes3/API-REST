import db from '../infra/db.js'

class UnidadeDAO {
    static listar() {
        const query = 'SELECT * FROM UNIDADES';
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
        const query = "SELECT * FROM UNIDADES WHERE id_unidade = ?";
        return new Promise((resolve, reject) => {
          db.get(query, [id], (err, row) => {
            if (err) {
              reject(false);
            }
            resolve(row);
          });
        });
      }

    static inserir(unidade) {
        const query = 'INSERT INTO UNIDADES (id_unidade, unidade, cnpj, telefone, endereco) VALUES (?, ?, ?, ?, ?)';
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
        const query = 'DELETE FROM UNIDADES WHERE id_unidade = ?';
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
        const query = 'UPDATE UNIDADES SET unidade = ?, cnpj = ?, telefone = ?, endereco = ? WHERE id_unidade = ?';
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