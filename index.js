const express = require('express');
const sequelize = require('./database');
const cors = require('cors');
const Operador = require('./models/Operador');
const Cliente = require('./models/Cliente');
const Distribuicao = require('./models/Distribuicao');

const app = express();
app.use(cors()); 
app.use(express.json());

// Sincronizando os modelos com o banco de dados
sequelize.sync()
  .then(() => {
    console.log('Modelos sincronizados com o banco de dados');
  })
  .catch((error) => {
    console.error('Erro ao sincronizar com o banco de dados:', error);
  });

// Rotas para Operadores
app.post('/operadores', async (req, res) => {
  try {
    const operador = await Operador.create(req.body);
    res.status(201).json(operador);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Rota para atualizar um operador pelo ID
app.put('/operadores/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const { nome } = req.body;
      
      // Busca o operador pelo ID
      const operador = await Operador.findByPk(id);
      
      // Verifica se o operador existe
      if (!operador) {
        return res.status(404).json({ error: 'Operador não encontrado' });
      }
      
      // Atualiza o operador com os novos dados
      operador.nome = nome; // Pode adicionar mais campos conforme necessário
      await operador.save();
      
      res.status(200).json(operador); // Retorna o operador atualizado
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });


// Rota para deletar um operador pelo ID
app.delete('/operadores/:id', async (req, res) => {
    try {
      const { id } = req.params;
      
      // Busca o operador pelo ID
      const operador = await Operador.findByPk(id);
      
      // Verifica se o operador existe
      if (!operador) {
        return res.status(404).json({ error: 'Operador não encontrado' });
      }
      
      // Deleta o operador
      await operador.destroy();
      
      res.status(204).send(); // Retorna um status 204 (No Content) para indicar sucesso
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });
  

app.get('/operadores', async (req, res) => {
  try {
    const operadores = await Operador.findAll();
    res.json(operadores);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Rotas para Clientes
app.post('/clientes', async (req, res) => {
  try {
    const cliente = await Cliente.create(req.body);
    res.status(201).json(cliente);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.get('/clientes', async (req, res) => {
  try {
    const clientes = await Cliente.findAll();
    res.json(clientes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Rota para atualizar um cliente pelo ID
app.put('/clientes/:id', async (req, res) => {
    try {
      const { id } = req.params; // Extrai o id dos parâmetros da URL
      const { nome, nascimento, valor, email } = req.body; // Extrai os dados do corpo da requisição
  
      // Busca o cliente pelo ID
      const cliente = await Cliente.findByPk(id);
  
      // Verifica se o cliente existe
      if (!cliente) {
        return res.status(404).json({ error: 'Cliente não encontrado' });
      }
  
      // Atualiza o cliente com os novos dados
      cliente.nome = nome;
      cliente.nascimento = nascimento;
      cliente.valor = valor;
      cliente.email = email;
  
      // Salva as alterações no banco de dados
      await cliente.save();
  
      res.status(200).json(cliente); // Retorna o cliente atualizado
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });


  // Rota para deletar um cliente pelo ID
  app.delete('/clientes/:id', async (req, res) => {
    try {
      const { id } = req.params;
  
      // Busca o cliente pelo ID
      const cliente = await Cliente.findByPk(id);
  
      // Verifica se o cliente existe
      if (!cliente) {
        return res.status(404).json({ error: 'Cliente não encontrado' });
      }
  
      // Exclui o cliente e as distribuições associadas por exclusão em cascata
      await cliente.destroy();
  
      res.status(204).send(); // Sucesso, nada a retornar
    } catch (error) {
      console.error('Erro ao deletar cliente:', error);
      res.status(400).json({ error: error.message });
    }
  });
  
  


// Iniciando o servidor
app.listen(3000, () => {
  console.log('Servidor rodando em http://localhost:3000');
});
