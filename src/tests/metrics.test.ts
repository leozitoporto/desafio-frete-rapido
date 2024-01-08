import express from 'express'
import request from 'supertest'
import { Request, Response } from 'express'

const app = express()
app.use(express.json())

app.get('/metrics/:last_quotes?', async (req: Request, res: Response) => {
  if (req.params.last_quotes === undefined) {
    return res.status(200).json({
      metrics: [
        {
          carrier: 'CORREIOS',
          results: '12',
          total_price: 1033.17,
          avg_price: 86.09750000000001,
          min_price: 30.65,
          max_price: 183.48,
        },
        {
          carrier: 'TESTE',
          results: '2',
          total_price: 121.60999999999999,
          avg_price: 60.80499999999999,
          min_price: 30.65,
          max_price: 90.96,
        },
      ],
    })
  }

  //Verifica se o parâmetro passado é um número
  if (isNaN(parseInt(req.params.last_quotes))) {
    return res.status(400).json({
      error: true,
      mensage:
        'Você deve enviar como parâmetro um número. Este parâmetro é opcional.',
      example: 'base_url/metrics/10',
    })
  }

  //Se o parâmetro for um número é criada uma métrica
  if (typeof parseInt(req.params.last_quotes) === 'number') {
    return res.status(200).json({
      metrics: [
        {
          carrier: 'CORREIOS',
          results: '12',
          total_price: 1033.17,
          avg_price: 86.09750000000001,
          min_price: 30.65,
          max_price: 183.48,
        },
      ],
    })
  }
})

describe('Metric Route', () => {
  it('Com tipo incorreto para parâmetro', (done) => {
    request(app)
      .get('/metrics/a')
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .expect(400, done)
  })

  it('Retorno de successo sem parâmetro', (done) => {
    request(app)
      .get('/metrics')
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .expect(200, done)
  })

  it('Retorno de successo com parâmetro igual a 1', (done) => {
    request(app)
      .get('/metrics/1')
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .expect(200, done)
  })
})
