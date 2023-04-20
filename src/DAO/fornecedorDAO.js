import db from '../infra/db.js'

class fornecedorDAO {
    static listar() {
        const query = 'SELECT * FROM fornecedores';
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
        const query = 'INSERT INTO fornecedores (id_fornecedor, nome, id_produto, cnpj, telefone, endereco, id_unidade) VALUES (?, ?, ?, ?, ?, ?, ?)';
        return new Promise((resolve, reject) => {
            db.run(query, [fornecedor.id_fornecedor, fornecedor.nome, fornecedor.id_produto, fornecedor.cnpj, fornecedor.telefone, fornecedor.endereco, fornecedor.id_unidade], function (err) {
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
        const query = 'DELETE FROM fornecedores WHERE id_fornecedor = ?';
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
        const query = 'UPDATE fornecedores SET nome = ?, id_produto = ?, cnpj = ?, telefone = ?, endereco = ?, id_unidade = ? WHERE id_fornecedor = ?';
        return new Promise((resolve, reject) => {
            db.run(query, [fornecedor.nome, fornecedor.id_produto, fornecedor.cnpj, fornecedor.telefone, fornecedor.endereco, fornecedor.id_unidade, id], (err) => {
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