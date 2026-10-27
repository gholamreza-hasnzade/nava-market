import { useMemo, useState } from 'react'
import { ArrowLeft, BadgePercent, ChevronDown, ShieldCheck, Sparkles, Tag } from 'lucide-react'
import { Link } from 'react-router-dom'
import { ProductCard } from '@/components/molecules/product-card'
import { categories, products } from '@/data/products'
import { discountPercent, formatPrice } from '@/lib/format'

export function OffersPage() {
  const [category, setCategory] = useState('all')
  const [sort, setSort] = useState('discount')
  const discounted = useMemo(() => products.filter((product) => product.originalPrice && product.originalPrice > product.price && (category === 'all' || product.category === category)).sort((a, b) => {
    if (sort === 'price-low') return a.price - b.price
    if (sort === 'saving') return (b.originalPrice! - b.price) - (a.originalPrice! - a.price)
    return discountPercent(b.price, b.originalPrice) - discountPercent(a.price, a.originalPrice)
  }), [category, sort])
  const maxSaving = discounted.reduce((maximum, product) => Math.max(maximum, product.originalPrice! - product.price), 0)
  const biggestDiscount = discounted.reduce((maximum, product) => Math.max(maximum, discountPercent(product.price, product.originalPrice)), 0)

  return <main className="shell page-space offers-page"><section className="offers-hero offers-hero--individual"><div className="offers-hero-badge"><Tag size={15}/>تخفیف هر کالا، جدا و شفاف</div><h1>تخفیف را <span>برای همان کالا</span> ببین.</h1><p>قیمت قبلی، قیمت امروز و مبلغ صرفه‌جویی هر آیتم روی کارت خودش آمده؛ خبری از تخفیف مبهم روی کل سبد نیست.</p><div className="offers-hero-facts"><span><b>{discounted.length.toLocaleString('fa-IR')}</b> کالای تخفیف‌دار</span><span><b>{biggestDiscount.toLocaleString('fa-IR')}٪</b> بیشترین تخفیف</span><span><b>{formatPrice(maxSaving)}</b> بیشترین صرفه‌جوییِ یک کالا</span></div><BadgePercent className="offers-hero-mark" size={105}/></section>
    <Link to="/campaigns" className="campaign-hub-banner"><span className="campaign-hub-mark"><Sparkles size={22}/></span><span><b>دنبال پیشنهادهای موضوعی هستی؟</b><small>کمپین‌ها را ببین؛ هرکدام موضوع، کالاها و زمان پایان مخصوص خودش را دارد.</small></span><span className="campaign-hub-cta">رفتن به کمپین‌ها <ArrowLeft size={15}/></span></Link>
    <section className="individual-offers-section"><div className="offers-list-heading"><div><p className="eyebrow">قیمت‌گذاری مستقل برای هر آیتم</p><h2>کالاهای تخفیف‌دار</h2><p>تخفیف یک محصول به محصول دیگر یا به کل سبد تعمیم داده نمی‌شود.</p></div><label className="offers-sort"><span>مرتب‌سازی</span><ChevronDown size={14}/><select aria-label="مرتب‌سازی تخفیف‌ها" value={sort} onChange={(event) => setSort(event.target.value)}><option value="discount">بیشترین درصد تخفیف</option><option value="saving">بیشترین مبلغ صرفه‌جویی</option><option value="price-low">کمترین قیمت</option></select></label></div>
      <div className="offer-category-filters" aria-label="فیلتر دسته‌بندی تخفیف‌ها"><button className={category === 'all' ? 'is-active' : ''} onClick={() => setCategory('all')}>همهٔ تخفیف‌ها <span>{products.filter((product) => product.originalPrice).length.toLocaleString('fa-IR')}</span></button>{categories.filter((item) => products.some((product) => product.category === item.id && product.originalPrice)).map((item) => <button key={item.id} className={category === item.id ? 'is-active' : ''} onClick={() => setCategory(item.id)}>{item.name}</button>)}</div>
      {discounted.length ? <div className="product-grid offer-products-grid">{discounted.map((product) => <ProductCard key={product.id} product={product}/>)}</div> : <div className="empty-results"><span><Tag size={28}/></span><h2>در این دسته تخفیفی نیست</h2><button className="button button-outline" onClick={() => setCategory('all')}>دیدن همهٔ تخفیف‌ها</button></div>}
    </section><aside className="trust-callout"><span><ShieldCheck/></span><div><h3>قبل از خرید، فقط درصد را نبین</h3><p>امتیاز فروشنده، موجودی، نظر خریداران و مبلغ نهایی را هم بررسی کن؛ اطلاعات هر کالا جداگانه نمایش داده شده است.</p></div></aside></main>
}
