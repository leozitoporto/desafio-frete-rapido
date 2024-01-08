import { Register } from '../../models/register'

interface IData {
  name: string
  service: string
  price: number
}

export const registerService = async (data: any) => {
  data.forEach(async (element: IData) => {
    await Register.create({
      carrier: element.name,
      service: element.service,
      final_price: element.price,
    })
      .then(() => console.log('Registro Salvo!'))
      .catch((error) => console.log(error))
  })
}
