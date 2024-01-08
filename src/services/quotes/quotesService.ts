import 'dotenv/config'
import { carrierConstructor } from '../../utils/quotes/carrierConstructor'
import { quoteConstructor } from '../../utils/quotes/quoteConstructor'
import { registerService } from '../register/registerService'
import axios from 'axios'

const QuotesService = async (data: any) => {
  const body = quoteConstructor(data)

  var config = {
    method: 'post',
    url: process.env.BASE_URL_FRETE_RAPIDO,
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
  }

  let result: any = ''
  console.log(data)
  await axios(config)
    .then((response: any) => (result = response.data))
    .catch((error: any) => (result = error.response.data))

  // Converte a saida para o model do desafio
  if (result.dispatchers) {
    const outData = await carrierConstructor(result)

    // Salva no banco de dados
    await registerService(outData)

    return outData
  } else {
    return result
  }
}

export default QuotesService
