export const QuotesController = (data: any) => {
  if (data.recipient && data.volumes) return true
  else return false
}
