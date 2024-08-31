const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const Operador = sequelize.define('Operador', {
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: 'operadores',
  timestamps: false,
});

module.exports = Operador;
