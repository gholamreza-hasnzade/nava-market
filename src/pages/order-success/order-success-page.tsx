import { Link, useLocation } from 'react-router-dom'
import { ArrowLeft, Check, PackageCheck, ShieldCheck } from 'lucide-react'
import type { OrderRecord } from '@/types/domain/order'
import { formatPrice } from '@/lib/format'

export function OrderSuccessPage() {
  const location = useLocation()
  const state = location.state as { orderId?: string; total?: number } | null
  let lastOrder: OrderRecord | undefined
  try { lastOrder = (JSON.parse(localStorage.getItem('nava-orders-v1') ?? '[]') as OrderRecord[])[0] } catch { lastOrder = undefined }
  const orderId = state?.orderId ?? lastOrder?.id
  const total = state?.total ?? lastOrder?.total
  return <main className="shell page-space"><section className="success-card"><div className="success-mark"><Check size={34}/></div><p className="eyebrow">ثبت آزمایشی موفق</p><h1>همه‌چیز آماده است!</h1><p className="success-copy">سفارش نمایشی تو ثبت شد. در نسخهٔ واقعی، جزئیات پیگیری به همین صفحه اضافه می‌شود.</p><div className="success-order"><div><span><PackageCheck size={16}/>شماره سفارش</span><b>{orderId ?? '—'}</b></div>{total !== undefined && <div><span>مبلغ سفارش</span><b>{formatPrice(total)}</b></div>}<div><span><ShieldCheck size={16}/>وضعیت</span><b className="success-status">منتظر تأیید فروشنده</b></div></div><div className="success-actions"><Link to="/" className="button button-primary">بازگشت به فروشگاه <ArrowLeft size={16}/></Link><Link to="/account/orders" className="button button-outline">پیگیری سفارش</Link></div><small>هیچ پرداخت واقعی انجام نشده است.</small></section></main>
}
