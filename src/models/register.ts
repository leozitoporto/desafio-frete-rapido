import * as Sequelize from 'sequelize'
import { db } from './postgres/db'
import { opts } from './postgres/config_db'

export const Register = db.define(
  'quotes',
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    carrier: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    service: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    final_price: {
      type: Sequelize.FLOAT,
      allowNull: false,
    },
  },
  opts
)

//Criar tabela caso não exista.
Register.sync()
