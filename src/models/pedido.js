class Pedido {
    constructor(id, cliente, endereco, cpf, unidade, valor, itens ){
        this.id = id,
        this.cliente = cliente,
        this.cpf = cpf,
        this.endereco = endereco,
        this.unidade = unidade,
        this.itens = itens,
        this.valor = valor
    }
}

export default Pedido;