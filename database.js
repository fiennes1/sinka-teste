// database.js
const { Sequelize } = require('sequelize');

// Configuração da conexão com o MySQL
const sequelize = new Sequelize('importacao_dados', 'admin', 'Solotoplol1!', {
  host: 'database-sinka.cvamkqwoka27.us-east-1.rds.amazonaws.com',
  dialect: 'mysql', // Especifica o uso do MySQL
  logging: false, // Desabilita logs SQL no console
});

// Teste de conexão
sequelize.authenticate()
  .then(() => {
    console.log('Conectado ao MySQL com sucesso!');
  })
  .catch((error) => {
    console.error('Erro ao conectar ao MySQL:', error);
  });

module.exports = sequelize;
