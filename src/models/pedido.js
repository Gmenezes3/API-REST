class Pedido {
    constructor(id, cliente, quantidade, endereco, cpf, unidade, valor, itens ){
        this.id = id,
        this.cliente = cliente,
        this.cpf = cpf,
        this.endereco = endereco,
        this.unidade = unidade,
        this.quantidade = quantidade,
        this.itens = itens,
        this.valor = valor
    }
}

export default Pedido;