import { QuotesController } from '../../controllers/quotes/quotesController'
import { Request, Response } from 'express'
import { modelQuote } from '../../models/modelQuote'
import QuotesService from '../../services/quotes/quotesService'

export const quotesRoute = (app: any) => {
  app.post('/quote', async (req: Request, res: Response) => {
    // Verifica body
    const result: boolean | undefined = QuotesController(req.body)

    if (!result)
      return res.status(400).json({
        error: true,
        mensage: 'Você deve enviar a mensagem(body) corretamente.',
        model: modelQuote,
      })

    // Chama service
    const response = await QuotesService(req.body)

    // Retorno
    if (response.error) {
      return res.status(400).json({
        error: true,
        detail: response.error,
      })
    }

    return res.status(200).json({
      carrier: response,
    })
  })
}
