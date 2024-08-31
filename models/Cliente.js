const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const Cliente = sequelize.define('Cliente', {
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  nascimento: {
    type: DataTypes.DATE,
  },
  valor: {
    type: DataTypes.DECIMAL(10, 2),
  },
  email: {
    type: DataTypes.STRING,
  },
}, {
  tableName: 'clientes',
  timestamps: false,
});

module.exports = Cliente;
