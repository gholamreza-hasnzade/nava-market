import { useMemo, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { ArrowLeft, Check, ChevronLeft, ShieldCheck, Truck } from 'lucide-react'
import type { OrderRecord } from '@/types/domain/order'
import { useShop } from '@/context/shop-provider'
import { formatPrice, makeOrderNumber, toAsciiDigits } from '@/lib/format'

export function CheckoutPage() {
  const { cart, getProduct, removeFromCart, subtotal } = useShop()
  const navigate = useNavigate()
  const location = useLocation()
  const [step, setStep] = useState<'address' | 'review'>('address')
  const [fullName, setFullName] = useState('')
  const [mobile, setMobile] = useState('')
  const [city, setCity] = useState(localStorage.getItem('nava-city') ?? 'تهران')
  const [address, setAddress] = useState('')
  const [paymentMethod, setPaymentMethod] = useState<OrderRecord['paymentMethod']>('online-demo')
  const lines = useMemo(() => cart.map((line) => ({ ...line, product: getProduct(line.productId) })).filter((line) => line.product), [cart, getProduct])
  const shipping = subtotal >= 3000000 ? 0 : 69000
  const discount = localStorage.getItem('nava-coupon-v1') === 'NAVA10' ? Math.round(subtotal * .1) : 0
  const total = subtotal - discount + shipping

  if (!lines.length) return <main className="shell page-space"><div className="empty-results"><span>🛍</span><h2>سبد خرید خالی است</h2><button className="button button-primary" onClick={() => navigate('/')}>بازگشت به فروشگاه</button></div></main>

  function placeOrder() {
    const order: OrderRecord = { id: makeOrderNumber(), createdAt: new Date().toISOString(), total, discount, items: cart, fullName, mobile, city, address, paymentMethod }
    const existing = JSON.parse(localStorage.getItem('nava-orders-v1') ?? '[]') as OrderRecord[]
    localStorage.setItem('nava-orders-v1', JSON.stringify([order, ...existing]))
    localStorage.removeItem('nava-coupon-v1')
    cart.forEach((line) => removeFromCart(line.productId))
    navigate('/order-success', { state: { orderId: order.id, total: order.total } })
  }

  const orderId = (location.state as { orderId?: string } | null)?.orderId

  return <main className="shell page-space checkout-page"><div className="breadcrumb"><span>سبد خرید</span><ChevronLeft size={14}/><span className={step === 'address' ? 'current' : ''}>اطلاعات ارسال</span><ChevronLeft size={14}/><span className={step === 'review' ? 'current' : ''}>تأیید سفارش</span></div><div className="page-title-row"><div><p className="eyebrow">مرحله {step === 'address' ? '۱' : '۲'} از ۲</p><h1>{step === 'address' ? 'کجا برات بفرستیم؟' : 'سفارش را بررسی کن'}</h1></div><span className="checkout-protection"><ShieldCheck size={15}/>اطلاعاتت امن می‌ماند</span></div>
    <div className="checkout-layout"><section className="checkout-main">{step === 'address' ? <form onSubmit={(event) => { event.preventDefault(); setStep('review') }} className="checkout-form"><h2>اطلاعات گیرنده</h2><div className="form-grid"><label>نام و نام خانوادگی<input value={fullName} onChange={(event) => setFullName(event.target.value)} required minLength={3} placeholder="مثلاً نازنین رضایی"/></label><label>شماره موبایل<input type="tel" inputMode="tel" pattern="09[0-9]{9}" value={mobile} onChange={(event) => setMobile(toAsciiDigits(event.target.value))} required placeholder="۰۹۱۲۱۲۳۴۵۶۷"/></label><label>استان و شهر<select value={city} onChange={(event) => setCity(event.target.value)}>{['تهران', 'کرج', 'اصفهان', 'شیراز', 'مشهد'].map((name) => <option key={name}>{name}</option>)}</select></label><label className="form-wide">نشانی کامل<input value={address} onChange={(event) => setAddress(event.target.value)} required minLength={10} placeholder="خیابان، کوچه، پلاک، واحد و کد پستی"/></label></div><div className="checkout-delivery-note"><Truck size={17}/><div><b>ارسال استاندارد</b><span>زمان تحویل بر اساس شهر و موجودی فروشنده نمایش داده می‌شود.</span></div></div><button className="button button-primary" type="submit">ادامه به بررسی سفارش <ArrowLeft size={16}/></button></form> : <div className="checkout-review"><div className="review-heading"><Check size={17}/><h2>نشانی تحویل</h2><button onClick={() => setStep('address')}>ویرایش</button></div><p><b>{fullName}</b> · {mobile}</p><p>{city}، {address}</p><div className="payment-options"><h3>روش پرداخت</h3><label className={paymentMethod === 'online-demo' ? 'payment-selected' : ''}><input type="radio" name="payment" checked={paymentMethod === 'online-demo'} onChange={() => setPaymentMethod('online-demo')}/><span><b>پرداخت آنلاین (نمایشی)</b><small>در این نسخه تراکنش واقعی انجام نمی‌شود.</small></span></label><label className={paymentMethod === 'cash-on-delivery' ? 'payment-selected' : ''}><input type="radio" name="payment" checked={paymentMethod === 'cash-on-delivery'} onChange={() => setPaymentMethod('cash-on-delivery')}/><span><b>پرداخت هنگام تحویل</b><small>فقط جهت نمایش جریان خرید نمونه.</small></span></label></div><div className="checkout-review-items"><h3>اقلام سفارش</h3>{lines.map(({ product, quantity }) => product && <div key={product.id}><span>{product.title} × {quantity.toLocaleString('fa-IR')}</span><b>{formatPrice(product.price * quantity)}</b></div>)}</div><button className="button button-primary" onClick={placeOrder}>ثبت سفارش نمایشی <ArrowLeft size={16}/></button><p className="demo-payment-warning">این نمونه‌کار پرداخت واقعی، ثبت سفارش یا ارسال کالا انجام نمی‌دهد.</p></div>}</section>
      <aside className="cart-summary checkout-summary"><h2>خلاصه سفارش</h2>{lines.map(({ product, quantity }) => product && <div className="summary-row" key={product.id}><span>{product.title.slice(0, 28)} × {quantity.toLocaleString('fa-IR')}</span><b>{formatPrice(product.price * quantity)}</b></div>)}<div className="summary-row"><span>ارسال</span><b>{shipping ? formatPrice(shipping) : 'رایگان'}</b></div><div className="summary-total"><span>مبلغ نهایی</span><strong>{formatPrice(total)}</strong></div><p className="secure-note"><ShieldCheck size={14}/>سفارش نمونه {orderId ? `· ${orderId}` : '· اطلاعات فقط در همین مرورگر ذخیره می‌شود'}</p></aside>
    </div></main>
}
