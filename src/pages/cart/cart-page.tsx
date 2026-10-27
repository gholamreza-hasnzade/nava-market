import { useMemo, useState } from 'react'
import { ArrowLeft, ArrowRight, Minus, Plus, ShieldCheck, ShoppingBag, Trash2, Truck } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useShop } from '@/context/shop-provider'
import { formatPrice } from '@/lib/format'

export function CartPage() {
  const { cart, getProduct, setQuantity, removeFromCart, subtotal } = useShop()
  const [coupon, setCoupon] = useState(() => localStorage.getItem('nava-coupon-v1') ?? '')
  const [couponApplied, setCouponApplied] = useState(() => localStorage.getItem('nava-coupon-v1') === 'NAVA10')
  const lines = useMemo(() => cart.map((line) => ({ ...line, product: getProduct(line.productId) })).filter((line) => line.product), [cart, getProduct])
  const discount = couponApplied ? Math.round(subtotal * .1) : 0
  const shipping = subtotal >= 3000000 || subtotal === 0 ? 0 : 69000
  const total = subtotal - discount + shipping
  const applyCoupon = () => {
    const valid = coupon.trim().toLocaleUpperCase('en') === 'NAVA10'
    setCouponApplied(valid)
    if (valid) { setCoupon('NAVA10'); localStorage.setItem('nava-coupon-v1', 'NAVA10') }
    else localStorage.removeItem('nava-coupon-v1')
  }

  if (!lines.length) return <main className="shell page-space"><div className="page-title-row"><div><p className="eyebrow">سبد خرید</p><h1>انتخاب‌هایت اینجاست</h1></div></div><div className="empty-results cart-empty"><span><ShoppingBag size={35}/></span><h2>سبد خریدت هنوز خالیه</h2><p>از بین انتخاب‌های نوا، چیزی که دوست داری پیدا کن.</p><Link to="/" className="button button-primary">رفتن به فروشگاه <ArrowLeft size={16}/></Link></div></main>

  return <main className="shell page-space"><div className="page-title-row"><div><p className="eyebrow">سبد خرید</p><h1>آماده‌ای برای خرید؟</h1><p>{lines.length.toLocaleString('fa-IR')} کالا در سبد تو</p></div><Link to="/" className="text-link">ادامه خرید <ArrowLeft size={16}/></Link></div><div className="cart-layout"><section className="cart-lines">{lines.map(({ product, quantity }) => product && <article key={product.id} className="cart-line"><Link to={`/products/${product.slug}`} className={`cart-line-image product-image--${product.visualTone}`}>{product.image ? <img src={product.image} alt=""/> : <span>{product.visual}</span>}</Link><div className="cart-line-info"><Link to={`/products/${product.slug}`} className="cart-line-title">{product.title}</Link><p>فروشنده: {product.seller.name}</p><span className="delivery-inline"><Truck size={13}/>ارسال از انبار فروشنده</span><div className="cart-line-bottom"><div className="quantity-control"><button type="button" aria-label={`کم کردن تعداد ${product.title}`} onClick={() => setQuantity(product.id, quantity - 1)}><Minus size={13}/></button><span>{quantity.toLocaleString('fa-IR')}</span><button type="button" aria-label={`زیاد کردن تعداد ${product.title}`} disabled={quantity >= product.stock} onClick={() => setQuantity(product.id, quantity + 1)}><Plus size={13}/></button></div><button className="remove-line" onClick={() => removeFromCart(product.id)}><Trash2 size={14}/>حذف</button></div></div><div className="cart-line-price"><strong>{formatPrice(product.price * quantity)}</strong>{product.originalPrice && <del>{formatPrice(product.originalPrice * quantity)}</del>}</div></article>)}</section><aside className="cart-summary"><h2>خلاصه سفارش</h2><div className="coupon-form"><label htmlFor="coupon-code">کد تخفیف</label><div><input id="coupon-code" value={coupon} onChange={(event) => { setCoupon(event.target.value); setCouponApplied(false); localStorage.removeItem('nava-coupon-v1') }} placeholder="کد را وارد کن"/><button type="button" onClick={applyCoupon}>اعمال</button></div>{coupon && <small className={couponApplied ? 'coupon-ok' : coupon.toUpperCase() !== 'NAVA10' ? 'coupon-hint' : ''}>{couponApplied ? '۱۰٪ تخفیف اعمال شد.' : coupon.toUpperCase() === 'NAVA10' ? 'کد برای سفارش شما آماده است.' : 'کد معتبر نمونه: NAVA10'}</small>}</div><div className="summary-row"><span>جمع کالاها</span><b>{formatPrice(subtotal)}</b></div>{discount > 0 && <div className="summary-row summary-discount"><span>تخفیف</span><b>− {formatPrice(discount)}</b></div>}<div className="summary-row"><span>هزینه ارسال</span><b>{shipping === 0 ? 'رایگان' : formatPrice(shipping)}</b></div><div className="free-shipping-note"><Truck size={15}/>{subtotal >= 3000000 ? 'ارسال سفارش شما رایگان شد!' : `برای ارسال رایگان ${formatPrice(Math.max(0, 3000000 - subtotal))} دیگر خرید کن.`}</div><div className="summary-total"><span>مبلغ قابل پرداخت</span><strong>{formatPrice(total)}</strong></div><Link to="/checkout" className="button button-primary checkout-button">ادامه و ثبت سفارش <ArrowLeft size={16}/></Link><p className="secure-note"><ShieldCheck size={14}/>در مرحله بعد، آدرس و روش پرداخت نمایشی را انتخاب می‌کنی.</p></aside></div><Link to="/" className="continue-link"><ArrowRight size={14}/>بازگشت به خرید</Link></main>
}
