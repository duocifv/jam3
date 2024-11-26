

export function cleanPrice(price: string) {
  if(!price) return 0
  return parseFloat(price.replace(/&nbsp;|₫/g, '').trim())
}
