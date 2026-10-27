import { BadgePercent, Clock3, Sparkles } from 'lucide-react'
import { ProductCard } from '@/components/molecules/product-card'
import { products } from '@/data/products'
import { discountPercent } from '@/lib/format'

export function OffersPage() {
  const discounted = products.filter((product) => product.originalPrice).sort((a, b) => discountPercent(b.price, b.originalPrice) - discountPercent(a.price, a.originalPrice))
  return <main className="shell page-space offers-page"><section className="offers-hero"><div className="offers-hero-badge"><Sparkles size={15}/>انتخاب‌های محدود نوا</div><h1>خرید خوب،<br/><span>با قیمت بهتر.</span></h1><p>تخفیف‌ها را با امتیاز و فروشنده کنار هم ببین؛ نه فقط با برچسب قرمز.</p><div className="offer-timer"><Clock3 size={15}/>پیشنهادهای نمونه؛ قیمت‌ها برای نمایش رابط کاربری‌اند.</div><BadgePercent className="offers-hero-mark" size={105}/></section><div className="page-title-row offer-title"><div><p className="eyebrow">تخفیف‌های منتخب</p><h2>{discounted.length.toLocaleString('fa-IR')} پیشنهاد برای یک انتخاب بهتر</h2></div><span className="offer-sort-note"><BadgePercent size={15}/>مرتب‌شده بر اساس درصد تخفیف</span></div><div className="product-grid">{discounted.map((product) => <ProductCard key={product.id} product={product}/>)}</div><section className="trust-callout"><span><ShieldCheckIcon/></span><div><h3>تخفیف خوب، فقط عدد کمتر نیست</h3><p>امتیاز فروشنده، نظر خریداران و اطلاعات ارسال را هم قبل از خرید بررسی کن.</p></div></section></main>
}

function ShieldCheckIcon() {
  return <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden><path d="M12 22s8-4 8-11V5l-8-3-8 3v6c0 7 8 11 8 11Z"/><path d="m9 12 2 2 4-4"/></svg>
}
