// models/Distribuicao.js
const { DataTypes } = require('sequelize');
const sequelize = require('../database'); // Assumindo que você tem um arquivo para configurar o Sequelize
const Cliente = require('./Cliente'); // Importa o modelo Cliente
const Operador = require('./Operador'); // Importa o modelo Operador

const Distribuicao = sequelize.define('Distribuicao', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  cliente_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Cliente,
      key: 'id',
    },
    onDelete: 'CASCADE', // Configura exclusão em cascata
  },
  operador_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Operador,
      key: 'id',
    },
  },
});

// Configuração dos relacionamentos
Cliente.hasMany(Distribuicao, { foreignKey: 'cliente_id', onDelete: 'CASCADE' });
Operador.hasMany(Distribuicao, { foreignKey: 'operador_id' });
Distribuicao.belongsTo(Cliente, { foreignKey: 'cliente_id' });
Distribuicao.belongsTo(Operador, { foreignKey: 'operador_id' });

module.exports = Distribuicao;
