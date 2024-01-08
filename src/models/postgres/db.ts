import 'dotenv/config'
import { Sequelize } from 'sequelize'

export const db: Sequelize = new Sequelize(
  process.env.DATABASE_POSTGRES as string,
  process.env.USER_POSTGRES as string,
  process.env.PASSWORD_POSTGRES,
  {
    host: process.env.HOST_POSTGRES,
    port: 5432,
    dialect: 'postgres',
    dialectOptions: {
      timezone: '+03:00',
    },
  }
)

db.authenticate()
  .then(() => {
    console.log('Conectadom com Banco de Dados')
  })
  .catch((erro: Error) => {
    console.log('Erro de conexão: ', erro)
  })
