import { Request, Response } from 'express'
import { metricController } from '../../controllers/metrics/metricController'
import { metricServices } from '../../services/metrics/metricService'

export const metricsRoute = (app: any) => {
  app.get('/metrics/:last_quotes?', async (req: Request, res: Response) => {
    // Verifica params
    if (req.params.last_quotes) {
      const result: boolean | undefined = metricController(
        req.params.last_quotes
      )

      if (!result)
        return res.status(400).json({
          error: true,
          mensage: 'You must send as params a number. This params is optional',
          example: 'base_url/metrics/10',
        })
    }

    // Chama o service
    const response = await metricServices(req.params.last_quotes)

    // Retorno
    if (response.error) {
      return res.status(400).json({
        error: true,
        detail: response.error,
      })
    }

    return res.status(200).json({
      metrics: response,
    })
  })
}
