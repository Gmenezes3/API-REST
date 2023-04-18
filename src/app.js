// Importando o packages
import express from 'express'

// instanciando o servidor
const app = express()

// configurando o servidor para receber requisições com o corpo no formato JSON
app.use(express.json())

// importando os controllers
import clienteController from './controllers/clienteController.js'
import fornecedorController from './controllers/fornecedorController.js'
import funcionarioController from './controllers/funcionarioController.js'
import pedidoController from './controllers/pedidoController.js'
import produtoController from './controllers/produtoController.js'
import unidadeController from './controllers/unidadeController.js'

clienteController.rotas(app)
fornecedorController.rotas(app)
funcionarioController.rotas(app)
pedidoController.rotas(app)
produtoController.rotas(app)
unidadeController.rotas(app)

export default app
