export const quoteConstructor = (data: any) => {
  const result: any = JSON.stringify({
    shipper: {
      registered_number: '25438296000158',
      token: '1d52a9b6b78cf07b08586152459a5c90',
      platform_code: '5AKVkHqCn',
    },
    recipient: { zipcode: data.recipient.address.zipcode },
    dispatchers: [
      {
        registered_number: '25438296000158',
        zipcode: 29161376,
        total_price: 0,
        volumes: data.volumes,
      },
    ],
    channel: '',
    filter: 0,
    limit: 0,
    identification: '',
    reverse: false,
    simulation_type: [0],
    returns: { composition: false, volumes: false, applied_rules: false },
  })

  return result
}
