import { QueryTypes } from 'sequelize'
import { db } from '../../models/postgres/db'
import {
  queryMetric,
  queryMetricLast,
} from '../../repositories/querys/metricsQuery'

export const metricServices = async (params: any) => {
  let result: any = ''

  await db
    .query(params ? queryMetricLast(params) : queryMetric, {
      type: QueryTypes.SELECT,
    })
    .then((response) => (result = response))
    .catch((error) => console.log(error))

  return result
}
