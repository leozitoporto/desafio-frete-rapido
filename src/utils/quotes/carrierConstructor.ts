export const carrierConstructor = async (data: any) => {
  const offers = data.dispatchers[0].offers

  let carriers: Array<any> = []

  offers.forEach((element: any) => {
    carriers.push({
      name: element.carrier.name,
      service: element.service,
      deadline: element.delivery_time.days,
      price: element.final_price,
    })
  })

  return carriers
}
