import { useMemo } from 'react'
import { ArrowLeft, ArrowUpDown, BadgePercent, ChevronLeft, Sparkles, Truck } from 'lucide-react'
import { Link, useSearchParams } from 'react-router-dom'
import { categories, products } from '@/data/products'
import { campaigns } from '@/data/campaigns'
import { CampaignCard } from '@/components/molecules/campaign-card'
import { ProductCard } from '@/components/molecules/product-card'

export function HomePage() {
  const [params, setParams] = useSearchParams()
  const query = params.get('q')?.trim().toLocaleLowerCase('fa') ?? ''
  const selectedCategory = params.get('category') ?? 'all'
  const sort = params.get('sort') ?? 'recommended'
  const filteredProducts = useMemo(() => {
    const matches = products.filter((product) => {
      const matchesText = !query || `${product.title} ${product.categoryLabel} ${product.seller.name} ${product.labels.join(' ')}`.toLocaleLowerCase('fa').includes(query)
      return matchesText && (selectedCategory === 'all' || product.category === selectedCategory) && (sort !== 'discount' || Boolean(product.originalPrice))
    })
    return matches.sort((a, b) => {
      if (sort === 'price-low') return a.price - b.price
      if (sort === 'price-high') return b.price - a.price
      if (sort === 'rating') return b.rating - a.rating
      if (sort === 'discount') return (b.originalPrice ?? b.price) - b.price - ((a.originalPrice ?? a.price) - a.price)
      return b.reviewCount - a.reviewCount
    })
  }, [query, selectedCategory, sort])

  const updateCategory = (category: string) => {
    const next = new URLSearchParams(params)
    if (category === 'all') next.delete('category')
    else next.set('category', category)
    setParams(next)
    document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return <main>
    <div className="shell">
      <section className="hero-banner"><img className="hero-art" src="/hero-products.png" alt="چیدمان منتخب کالاهای دیجیتال و سبک زندگی"/><div className="hero-shade"/><div className="hero-content"><div className="hero-kicker"><Sparkles size={14}/>انتخاب این هفته</div><h1>خرید خوب،<br/><span>حس خوب.</span></h1><p>محصولات محبوبت را با خیال راحت پیدا کن؛ از انتخاب تا تحویل، کنار تو هستیم.</p><Link to="/#catalog" className="button button-primary hero-cta">دیدن پیشنهادها <ArrowLeft size={17}/></Link><div className="hero-proof"><span><i/>ارسال مطمئن</span><span><i/>فروشنده‌های تأییدشده</span></div></div><div className="hero-index"><span>۰۱</span><i/><span>۰۳</span></div></section>

      <section className="benefit-strip" aria-label="مزیت‌های خرید از نوا"><div><span className="benefit-icon"><Truck size={19}/></span><p><b>ارسال سریع</b><small>به سراسر ایران</small></p></div><div><span className="benefit-icon benefit-icon--gold"><BadgePercent size={19}/></span><p><b>قیمت شفاف</b><small>بدون هزینه پنهان</small></p></div><div><span className="benefit-icon benefit-icon--violet"><Sparkles size={18}/></span><p><b>خرید مطمئن</b><small>فروشندگان منتخب</small></p></div><div className="benefit-note">تجربه‌ای ساده‌تر برای انتخاب‌های روزمره</div></section>

      <section className="section-block categories-section"><div className="section-heading"><div><p className="eyebrow">از کجا شروع کنیم؟</p><h2>دسته‌بندی‌های محبوب</h2></div><button className="text-link" onClick={() => updateCategory('all')}>همه کالاها <ChevronLeft size={16}/></button></div><div className="category-grid">{categories.map((category, index) => <button key={category.id} className={`category-tile category-tile--${category.color}`} onClick={() => updateCategory(category.id)}><span className="category-art" aria-hidden>{category.icon}</span><span className="category-name">{category.name}</span><span className="category-count">{products.filter((product) => product.category === category.id).length.toLocaleString('fa-IR')} محصول</span><span className="category-number">۰{index + 1}</span></button>)}</div></section>

      <section className="deal-banner"><div className="deal-icon"><BadgePercent size={23}/></div><div><span className="eyebrow">فرصت محدود</span><h2>پیشنهادهای ویژه برای حال خوبت</h2><p>محصولات منتخب با قیمت‌هایی که نباید از دست بدهی.</p></div><Link to="/offers" className="button button-dark">دیدن تخفیف‌های کالاها <ArrowLeft size={16}/></Link><div className="deal-orbit" aria-hidden>٪</div></section>

      <section className="section-block home-campaigns"><div className="section-heading"><div><p className="eyebrow">خرید موضوعی</p><h2>کمپین‌های فعال نوا</h2><p className="section-caption">برای هر موضوع، یک فرصت و زمان پایان مشخص</p></div><Link to="/campaigns" className="text-link">همهٔ کمپین‌ها <ArrowLeft size={14}/></Link></div><div className="campaign-grid campaign-grid--home">{campaigns.map((campaign) => <CampaignCard key={campaign.slug} campaign={campaign} productCount={campaign.productIds.filter((id) => products.some((product) => product.id === id && product.originalPrice)).length}/>)}</div></section>

      <section className="section-block catalog-section" id="catalog"><div className="section-heading catalog-heading"><div><p className="eyebrow">ویترین نوا</p><h2>{query ? `نتایج جست‌وجو برای «${params.get('q')}»` : selectedCategory !== 'all' ? categories.find((category) => category.id === selectedCategory)?.name : 'محبوب‌ترین انتخاب‌ها'}</h2><p className="section-caption">{filteredProducts.length.toLocaleString('fa-IR')} محصول برای یک خرید مطمئن</p></div><label className="sort-control"><ArrowUpDown size={15}/><span>مرتب‌سازی:</span><select aria-label="مرتب‌سازی محصولات" value={sort} onChange={(event) => { const next = new URLSearchParams(params); next.set('sort', event.target.value); setParams(next) }}><option value="recommended">پیشنهاد نوا</option><option value="rating">بالاترین امتیاز</option><option value="price-low">ارزان‌ترین</option><option value="price-high">گران‌ترین</option><option value="discount">بیشترین تخفیف</option></select></label></div>
        <div className="catalog-chips"><button className={selectedCategory === 'all' ? 'active' : ''} onClick={() => updateCategory('all')}>همه</button>{categories.map((category) => <button key={category.id} className={selectedCategory === category.id ? 'active' : ''} onClick={() => updateCategory(category.id)}>{category.name}</button>)}</div>
        {filteredProducts.length ? <div className="product-grid">{filteredProducts.map((product) => <ProductCard key={product.id} product={product}/>)}</div> : <div className="empty-results"><span>⌕</span><h3>چیزی پیدا نکردیم</h3><p>عبارت دیگری را جست‌وجو کن یا دسته‌بندی را تغییر بده.</p><button className="button button-primary" onClick={() => { setParams({}); }}>نمایش همه کالاها</button></div>}
      </section>
      <section className="newsletter"><div><p className="eyebrow">خبرهای خوب، گاهی</p><h2>پیشنهادهای تازه را از دست نده</h2><p>به‌زودی؛ خبرنامهٔ نوا برای انتخاب‌های بهتر.</p></div><Link to="/wishlist" className="button button-outline">دیدن علاقه‌مندی‌ها <ArrowLeft size={16}/></Link></section>
      <footer className="site-footer"><div className="footer-brand"><span className="brand-mark">ن</span><span className="brand-word">نوا<span>مارکت</span></span><p>خرید هوشمند، انتخاب مطمئن.</p></div><div><b>کشف نوا</b><Link to="/products">همهٔ محصولات</Link><Link to="/offers">تخفیف هر کالا</Link><Link to="/campaigns">کمپین‌های فعال</Link><Link to="/cart">سبد خرید</Link></div><div><b>حساب شما</b><Link to="/account/orders">سفارش‌های من</Link><Link to="/wishlist">علاقه‌مندی‌ها</Link><Link to="/compare">مقایسهٔ کالاها</Link></div><div><b>دربارهٔ نمونه‌کار</b><span>اطلاعات کالا و فروشنده نمایشی است.</span><span>پرداخت یا ارسال واقعی انجام نمی‌شود.</span></div><div className="footer-bottom">© نوا مارکت · نمونه‌کار فرانت‌اند · پرداخت واقعی انجام نمی‌شود.</div></footer>
    </div>
  </main>
}
