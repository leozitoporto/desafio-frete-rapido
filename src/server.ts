import 'dotenv/config'
import express from 'express'
import cors from 'cors'

import { quotesRoute, metricsRoute } from './routes'

const PORT = process.env.PORT

const app = express()

app.use(express.json())
app.use(cors())

// Routes
quotesRoute(app)
metricsRoute(app)

app.listen(PORT, () => {
  console.log('🚀 HTTP Server Running! ')
})
