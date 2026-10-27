import { useMemo, useState } from 'react'
import { Filter, Search, SlidersHorizontal, X } from 'lucide-react'
import { Link, useSearchParams } from 'react-router-dom'
import { categories, products } from '@/data/products'
import { ProductCard } from '@/components/molecules/product-card'
import { toAsciiDigits } from '@/lib/format'

export function ProductsPage() {
  const [params, setParams] = useSearchParams()
  const category = params.get('category') ?? 'all'
  const query = params.get('q')?.trim().toLocaleLowerCase('fa') ?? ''
  const sort = params.get('sort') ?? 'recommended'
  const [minPrice, setMinPrice] = useState('')
  const [maxPrice, setMaxPrice] = useState('')
  const [trustedOnly, setTrustedOnly] = useState(false)
  const [availableOnly, setAvailableOnly] = useState(false)
  const [minimumRating, setMinimumRating] = useState(0)
  const [filtersOpen, setFiltersOpen] = useState(false)

  const results = useMemo(() => products.filter((product) => {
    const matchesQuery = !query || `${product.title} ${product.categoryLabel} ${product.seller.name} ${product.labels.join(' ')}`.toLocaleLowerCase('fa').includes(query)
    return matchesQuery && (category === 'all' || product.category === category) && (!minPrice || product.price >= Number(minPrice)) && (!maxPrice || product.price <= Number(maxPrice)) && (!trustedOnly || product.seller.trusted) && (!availableOnly || product.stock > 0) && product.rating >= minimumRating
  }).sort((a, b) => sort === 'price-low' ? a.price - b.price : sort === 'price-high' ? b.price - a.price : sort === 'rating' ? b.rating - a.rating : sort === 'discount' ? (b.originalPrice ?? b.price) - b.price - ((a.originalPrice ?? a.price) - a.price) : b.reviewCount - a.reviewCount), [query, category, minPrice, maxPrice, trustedOnly, availableOnly, minimumRating, sort])

  function setFilter(name: string, value: string) {
    const next = new URLSearchParams(params)
    if (value === 'all' || !value) next.delete(name)
    else next.set(name, value)
    setParams(next)
  }

  function clearFilters() {
    setMinPrice(''); setMaxPrice(''); setTrustedOnly(false); setAvailableOnly(false); setMinimumRating(0); setParams({})
  }

  return <main className="shell page-space products-page"><div className="breadcrumb"><Link to="/">ویترین نوا</Link><span>›</span><span className="current">همه محصولات</span></div><header className="collection-hero"><div><p className="eyebrow">جست‌وجوی دقیق‌تر</p><h1>{query ? `نتایج «${params.get('q')}»` : category !== 'all' ? categories.find((item) => item.id === category)?.name : 'همهٔ انتخاب‌های نوا'}</h1><p>جزئیات را مقایسه کن، فروشنده را بشناس و با خیال راحت انتخاب کن.</p></div><span className="collection-hero-art">✳</span></header><div className="catalog-toolbar"><div><b>{results.length.toLocaleString('fa-IR')}</b><span> کالا پیدا شد</span></div><div className="catalog-toolbar-actions"><button className="filter-open-button" onClick={() => setFiltersOpen((open) => !open)}><SlidersHorizontal size={15}/>فیلترها</button><label className="sort-control"><span>مرتب‌سازی</span><select aria-label="مرتب‌سازی محصولات" value={sort} onChange={(event) => setFilter('sort', event.target.value)}><option value="recommended">پیشنهاد نوا</option><option value="rating">بالاترین امتیاز</option><option value="price-low">ارزان‌ترین</option><option value="price-high">گران‌ترین</option><option value="discount">بیشترین تخفیف</option></select></label></div></div><div className="products-layout"><aside className={`filter-panel ${filtersOpen ? 'filter-panel--open' : ''}`}><div className="filter-panel-title"><h2><Filter size={15}/>فیلتر نتایج</h2><button onClick={clearFilters}>حذف فیلترها</button><button className="filter-close" aria-label="بستن فیلترها" onClick={() => setFiltersOpen(false)}><X size={17}/></button></div><div className="filter-group"><h3>دسته‌بندی</h3><button className={category === 'all' ? 'filter-option selected' : 'filter-option'} onClick={() => setFilter('category', 'all')}>همه دسته‌ها <span>{products.length.toLocaleString('fa-IR')}</span></button>{categories.map((item) => <button key={item.id} className={category === item.id ? 'filter-option selected' : 'filter-option'} onClick={() => setFilter('category', item.id)}>{item.name}<span>{products.filter((product) => product.category === item.id).length.toLocaleString('fa-IR')}</span></button>)}</div><div className="filter-group"><h3>بازهٔ قیمت <small>(تومان)</small></h3><div className="price-range-inputs"><label>از<input inputMode="numeric" value={minPrice} onChange={(event) => setMinPrice(toAsciiDigits(event.target.value).replace(/\D/g, ''))} placeholder="۰"/></label><label>تا<input inputMode="numeric" value={maxPrice} onChange={(event) => setMaxPrice(toAsciiDigits(event.target.value).replace(/\D/g, ''))} placeholder="بدون سقف"/></label></div></div><div className="filter-group"><h3>امتیاز کاربران</h3>{[4.5, 4, 3.5].map((rating) => <label className="check-filter" key={rating}><input type="radio" name="rating" checked={minimumRating === rating} onChange={() => setMinimumRating(rating)}/><span>{rating.toLocaleString('fa-IR')} و بالاتر</span></label>)}<button className="clear-rating" onClick={() => setMinimumRating(0)}>هر امتیازی</button></div><div className="filter-group filter-checks"><label className="check-filter"><input type="checkbox" checked={trustedOnly} onChange={(event) => setTrustedOnly(event.target.checked)}/><span>فقط فروشندهٔ منتخب</span></label><label className="check-filter"><input type="checkbox" checked={availableOnly} onChange={(event) => setAvailableOnly(event.target.checked)}/><span>فقط کالاهای موجود</span></label></div><button className="button button-primary apply-filters" onClick={() => setFiltersOpen(false)}>نمایش {results.length.toLocaleString('fa-IR')} کالا</button></aside><section className="product-results">{results.length ? <div className="product-grid">{results.map((product) => <ProductCard key={product.id} product={product}/>)}</div> : <div className="empty-results"><span><Search size={30}/></span><h2>نتیجه‌ای پیدا نشد</h2><p>فیلترها را کمی بازتر کن یا عبارت دیگری را جست‌وجو کن.</p><button className="button button-primary" onClick={clearFilters}>پاک‌کردن فیلترها</button></div>}</section></div></main>
}
