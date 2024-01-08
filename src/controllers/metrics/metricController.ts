export const metricController = (data: any) => {
  if (isNaN(parseInt(data))) return false
  else return true
}
