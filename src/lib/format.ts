export function formatPrice(value: number) {
  return `${new Intl.NumberFormat('fa-IR').format(value)} تومان`
}

export function discountPercent(price: number, originalPrice?: number) {
  if (!originalPrice || originalPrice <= price) return 0
  return Math.round((1 - price / originalPrice) * 100)
}

export function toAsciiDigits(value: string) {
  return value.replace(/[۰-۹]/g, (digit) => String('۰۱۲۳۴۵۶۷۸۹'.indexOf(digit))).replace(/[٠-٩]/g, (digit) => String('٠١٢٣٤٥٦٧٨٩'.indexOf(digit)))
}

export function makeOrderNumber() {
  return `NV-${new Intl.DateTimeFormat('fa-IR', { year: '2-digit', month: '2-digit', day: '2-digit' }).format(new Date()).replaceAll('/', '')}-${Math.floor(1000 + Math.random() * 9000)}`
}
