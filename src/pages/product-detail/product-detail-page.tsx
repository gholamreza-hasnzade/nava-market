import { useEffect, useMemo, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, BadgeCheck, Check, ChevronLeft, Heart, MessageCircle, Minus, Plus, Scale, ShieldCheck, Star, Truck } from 'lucide-react'
import type { ProductQuestion } from '@/types/domain/question'
import type { ProductDetailTab, ProductQuestionSubmitEvent } from '@/types/components/pages/product-detail-page'
import { products } from '@/data/products'
import { useShop } from '@/context/shop-provider'
import { ProductCard } from '@/components/molecules/product-card'
import { formatPrice, discountPercent } from '@/lib/format'

const tabs: { id: ProductDetailTab; label: string }[] = [
  { id: 'overview', label: 'معرفی محصول' },
  { id: 'specifications', label: 'مشخصات فنی' },
  { id: 'reviews', label: 'دیدگاه خریداران' },
  { id: 'questions', label: 'پرسش و پاسخ' },
]

function readQuestions(productId?: string): ProductQuestion[] {
  if (!productId) return []
  try { const value: unknown = JSON.parse(localStorage.getItem(`nava-questions-${productId}`) ?? '[]'); return Array.isArray(value) ? value as ProductQuestion[] : [] } catch { return [] }
}

export function ProductDetailPage() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const product = useMemo(() => products.find((item) => item.slug === slug), [slug])
  const questionProductId = product?.id ?? ''
  const { addToCart, wishlist, toggleWishlist, compare, toggleCompare } = useShop()
  const [quantity, setQuantity] = useState(1)
  const [added, setAdded] = useState(false)
  const [activeTab, setActiveTab] = useState<ProductDetailTab>('overview')
  const [questions, setQuestions] = useState<ProductQuestion[]>([])
  const [questionText, setQuestionText] = useState('')
  const [helpful, setHelpful] = useState<string[]>([])
  useEffect(() => { setQuestions(readQuestions(product?.id)); setQuestionText(''); setActiveTab('overview') }, [product?.id])

  if (!product) return <main className="shell page-space"><div className="empty-results"><span>؟</span><h2>این کالا را پیدا نکردیم</h2><button className="button button-primary" onClick={() => navigate('/')}>بازگشت به فروشگاه</button></div></main>
  const discount = discountPercent(product.price, product.originalPrice)
  const saved = wishlist.includes(product.id)
  const inCompare = compare.includes(product.id)
  const related = products.filter((item) => item.category === product.category && item.id !== product.id).slice(0, 4)
  const averageRating = product.reviews?.length ? product.reviews.reduce((sum, review) => sum + review.rating, 0) / product.reviews.length : product.rating
  const reviews = product.reviews ?? []

  function submitQuestion(event: ProductQuestionSubmitEvent) {
    event.preventDefault()
    const body = questionText.trim()
    if (!body) return
    const next: ProductQuestion = { id: `q-${Date.now()}`, productId: questionProductId, author: 'کاربر نوا', body, createdAt: new Date().toISOString() }
    const updated = [next, ...questions]
    setQuestions(updated)
    localStorage.setItem(`nava-questions-${questionProductId}`, JSON.stringify(updated))
    setQuestionText('')
  }

  function toggleHelpful(reviewId: string) {
    setHelpful((current) => current.includes(reviewId) ? current.filter((id) => id !== reviewId) : [...current, reviewId])
  }

  return <main className="shell page-space"><div className="breadcrumb"><Link to="/">ویترین نوا</Link><ChevronLeft size={14}/><Link to={`/products?category=${product.category}`}>{product.categoryLabel}</Link><ChevronLeft size={14}/><span className="current">{product.title}</span></div>
    <div className="product-detail-layout"><section className={`detail-image product-image--${product.visualTone}`}><button className={`icon-action detail-favorite ${saved ? 'is-active' : ''}`} type="button" aria-label={saved ? 'حذف از علاقه‌مندی‌ها' : 'افزودن به علاقه‌مندی‌ها'} onClick={() => toggleWishlist(product.id)}><Heart size={20} fill={saved ? 'currentColor' : 'none'}/></button>{product.image ? <img src={product.image} alt={product.title}/> : <span className="product-emoji">{product.visual}</span>}<div className="image-count">۱ / ۳</div><span className="image-caption">تصویر محصول · طرح نمایشی</span></section>
      <section className="detail-copy"><div className="detail-tags"><span className="detail-category">{product.categoryLabel}</span>{product.labels.map((label) => <span className="detail-tag" key={label}>{label}</span>)}</div><h1>{product.title}</h1><p className="detail-latin">Nava curated selection · کد کالا: {product.id}</p><div className="detail-rating"><span><Star size={15} fill="currentColor"/>{product.rating.toLocaleString('fa-IR')}</span><button className="review-jump" onClick={() => setActiveTab('reviews')}>{product.reviewCount.toLocaleString('fa-IR')} دیدگاه</button><span className="seller-dot"/><Link className="seller-inline-link" to={`/sellers/${encodeURIComponent(product.seller.name)}`}>فروشنده: {product.seller.name}</Link>{product.seller.trusted && <span className="trusted-seller"><ShieldCheck size={14}/>فروشنده منتخب</span>}</div>
        <div className="detail-description"><h3>یک انتخاب برای استفادهٔ واقعی</h3><p>{product.description}</p></div><div className="detail-features"><h3>چرا این محصول؟</h3><ul>{product.features.map((feature) => <li key={feature}><Check size={14}/>{feature}</li>)}</ul></div>{product.color && <div className="color-choice"><span>رنگ: <b>{product.color}</b></span><span className="color-swatch" title={product.color}/></div>}
      </section>
      <aside className="purchase-panel"><div className="seller-row"><span className="seller-avatar">{product.seller.name.slice(0, 1)}</span><div><b><Link to={`/sellers/${encodeURIComponent(product.seller.name)}`}>{product.seller.name}</Link></b><small><Star size={11} fill="currentColor"/> {product.seller.rating.toLocaleString('fa-IR')} · عملکرد عالی</small></div><ShieldCheck className="seller-shield" size={18}/></div><div className="delivery-info"><Truck size={17}/><span><b>ارسال نوا</b><small>تحویل {product.labels.includes('ارسال امروز') ? 'امروز' : '۲ تا ۳ روز کاری'} پس از ثبت سفارش</small></span></div><div className="stock-info"><span className="stock-dot"/>تنها {product.stock.toLocaleString('fa-IR')} عدد در انبار فروشنده</div><div className="purchase-price">{product.originalPrice && <div><del>{formatPrice(product.originalPrice)}</del>{discount > 0 && <span className="discount-tag">{discount}% تخفیف</span>}</div>}<strong>{formatPrice(product.price)}</strong></div><div className="purchase-actions"><div className="quantity-control"><button type="button" aria-label="کم کردن تعداد" onClick={() => setQuantity((value) => Math.max(1, value - 1))}><Minus size={14}/></button><span>{quantity.toLocaleString('fa-IR')}</span><button type="button" aria-label="زیاد کردن تعداد" disabled={quantity >= product.stock} onClick={() => setQuantity((value) => Math.min(product.stock, value + 1))}><Plus size={14}/></button></div><button className={`button button-primary add-to-cart ${added ? 'added' : ''}`} onClick={() => { addToCart(product.id, quantity); setAdded(true); window.setTimeout(() => setAdded(false), 1200) }}>{added ? <Check size={17}/> : <><span>افزودن به سبد خرید</span><ArrowLeft size={17}/></>}</button></div><button className={`compare-detail ${inCompare ? 'is-selected' : ''}`} type="button" disabled={compare.length >= 4 && !inCompare} title={compare.length >= 4 && !inCompare ? 'حداکثر ۴ کالا قابل مقایسه است' : undefined} onClick={() => toggleCompare(product.id)}><Scale size={15}/>{inCompare ? 'در فهرست مقایسه است' : 'افزودن به مقایسه'}</button><p className="secure-note"><ShieldCheck size={14}/>پرداخت امن و ضمانت اصالت کالا</p></aside>
    </div>

    <section className="product-info-section"><div className="product-tab-list" role="tablist" aria-label="اطلاعات کامل محصول">{tabs.map((tab) => <button type="button" key={tab.id} role="tab" aria-selected={activeTab === tab.id} onClick={() => setActiveTab(tab.id)}>{tab.label}{tab.id === 'reviews' && <small>{product.reviewCount.toLocaleString('fa-IR')}</small>}</button>)}</div>
      {activeTab === 'overview' && <div className="tab-panel overview-panel"><div><p className="eyebrow">معرفی انتخاب نوا</p><h2>جزئیاتی که قبل از خرید باید بدانی</h2><p>{product.description} در نوا، مشخصات فروشنده و نکته‌های کلیدی کنار خود کالا قرار گرفته‌اند تا انتخابت روشن‌تر باشد.</p><ul>{product.features.map((feature) => <li key={feature}><Check size={15}/>{feature}</li>)}</ul></div><aside><span className="overview-symbol">{product.visual}</span><b>منتخب نوا</b><small>اطلاعات کالا و فروشنده برای تصمیم‌گیری شفاف‌تر کنار هم آمده‌اند.</small></aside></div>}
      {activeTab === 'specifications' && <div className="tab-panel"><div className="specification-heading"><div><p className="eyebrow">مشخصات فنی</p><h2>{product.title}</h2></div><span>{product.specifications?.length.toLocaleString('fa-IR')} مورد</span></div><div className="specification-table">{product.specifications?.map((specification) => <div key={specification.label}><span>{specification.label}</span><b>{specification.value}</b></div>)}<div><span>رنگ</span><b>{product.color ?? 'مطابق تصویر'}</b></div><div><span>وضعیت موجودی</span><b>{product.stock > 0 ? `موجود · ${product.stock.toLocaleString('fa-IR')} عدد` : 'ناموجود'}</b></div><div><span>فروشنده</span><b><Link to={`/sellers/${encodeURIComponent(product.seller.name)}`}>{product.seller.name}</Link></b></div><div><span>امتیاز فروشنده</span><b>{product.seller.rating.toLocaleString('fa-IR')} از ۵</b></div></div></div>}
      {activeTab === 'reviews' && <div className="tab-panel reviews-panel"><div className="reviews-summary"><div className="review-average"><strong>{averageRating.toLocaleString('fa-IR', { maximumFractionDigits: 1 })}</strong><span><Star size={16} fill="currentColor"/><Star size={16} fill="currentColor"/><Star size={16} fill="currentColor"/><Star size={16} fill="currentColor"/><Star size={16} fill="currentColor"/></span><small>بر اساس {product.reviewCount.toLocaleString('fa-IR')} دیدگاه ثبت‌شده</small></div><div className="rating-bars">{[5, 4, 3, 2, 1].map((rating) => { const count = reviews.filter((review) => Math.round(review.rating) === rating).length; const percent = reviews.length ? Math.round(count / reviews.length * 100) : 0; return <div key={rating}><span>{rating.toLocaleString('fa-IR')}</span><div><i style={{ width: `${percent}%` }}/></div><small>{percent.toLocaleString('fa-IR')}٪</small></div> })}</div></div><p className="sample-review-note">این دیدگاه‌ها برای نمایش رابط کاربری فروشگاه نمونه هستند.</p><div className="review-list">{reviews.map((review) => <article className="review-card" key={review.id}><div className="review-avatar">{review.author.slice(0, 1)}</div><div className="review-body"><div className="review-head"><div><b>{review.author}</b><small>{review.date} · {review.verifiedPurchase && <span><BadgeCheck size={11}/>خریدار این محصول</span>}</small></div><span className="review-stars">{review.rating.toLocaleString('fa-IR')} <Star size={12} fill="currentColor"/></span></div><h3>{review.title}</h3><p>{review.body}</p><button className={helpful.includes(review.id) ? 'helpful-button helpful-active' : 'helpful-button'} onClick={() => toggleHelpful(review.id)}><Check size={12}/>{helpful.includes(review.id) ? 'مفید بود' : 'این دیدگاه مفید بود؟'} <span>{(review.helpfulCount + (helpful.includes(review.id) ? 1 : 0)).toLocaleString('fa-IR')}</span></button></div></article>)}</div></div>}
      {activeTab === 'questions' && <div className="tab-panel questions-panel"><div className="specification-heading"><div><p className="eyebrow">پرسش از فروشنده</p><h2>سؤالت دربارهٔ این کالا را بپرس</h2></div><MessageCircle size={22}/></div><form className="question-form" onSubmit={submitQuestion}><label htmlFor="product-question">پرسش تو</label><textarea id="product-question" value={questionText} onChange={(event) => setQuestionText(event.target.value)} placeholder="مثلاً گارانتی این محصول شامل چه مواردی است؟" maxLength={360} required/><div><small>{questionText.length.toLocaleString('fa-IR')} / ۳۶۰ نویسه · پرسش فقط در مرورگر شما ذخیره می‌شود.</small><button className="button button-primary" type="submit" disabled={!questionText.trim()}>ثبت پرسش <ArrowLeft size={14}/></button></div></form>{questions.length ? <div className="question-list">{questions.map((question) => <article key={question.id}><span className="question-mark">؟</span><div><b>{question.author}</b><p>{question.body}</p><small>پرسش ثبت شد · {question.answer ? 'پاسخ فروشنده موجود است' : 'در انتظار پاسخ فروشنده'}</small></div></article>)}</div> : <div className="question-empty"><MessageCircle size={25}/><p>هنوز پرسشی ثبت نشده؛ اولین نفر باش.</p></div>}</div>}
    </section>

    {related.length > 0 && <section className="related-products"><div className="section-heading"><div><p className="eyebrow">از همین دسته</p><h2>شاید این‌ها را هم دوست داشته باشی</h2></div><Link className="text-link" to={`/products?category=${product.category}`}>دیدن دسته <ArrowLeft size={14}/></Link></div><div className="product-grid">{related.map((item) => <ProductCard key={item.id} product={item}/>)}</div></section>}
    <section className="detail-extra"><h2>چرا از نوا بخریم؟</h2><div><span>✓</span><p><b>فروشندهٔ قابل بررسی</b><small>امتیاز و عملکرد فروشنده شفاف نمایش داده می‌شود.</small></p></div><div><span>✓</span><p><b>انتخاب بدون ابهام</b><small>قیمت، موجودی و زمان ارسال را پیش از خرید می‌بینی.</small></p></div></section>
  </main>
}
