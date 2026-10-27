import { useMemo } from 'react'
import { useParams } from 'react-router-dom'
import { BadgeCheck, MapPin, PackageCheck, Star, Store, Truck } from 'lucide-react'
import { products } from '@/data/products'
import { ProductCard } from '@/components/molecules/product-card'

export function SellerDetailPage() {
  const { sellerName = '' } = useParams()
  const decodedName = decodeURIComponent(sellerName)
  const sellerProducts = useMemo(() => products.filter((product) => product.seller.name === decodedName), [decodedName])
  const seller = sellerProducts[0]?.seller
  if (!seller) return <main className="shell page-space"><div className="empty-results"><span><Store size={32}/></span><h2>فروشنده پیدا نشد</h2><p>فروشندهٔ انتخاب‌شده در این نسخهٔ نمایشی فعال نیست.</p></div></main>
  return <main className="shell page-space seller-page"><div className="seller-cover"><div className="seller-cover-lines"/><div className="seller-profile-mark">{seller.name.slice(0, 1)}</div><div className="seller-profile-info"><p className="eyebrow">فروشندهٔ مارکت‌پلیس نوا</p><h1>{seller.name}{seller.trusted && <BadgeCheck size={21}/>}</h1><div className="seller-profile-meta"><span><Star size={14} fill="currentColor"/>{seller.rating.toLocaleString('fa-IR')} امتیاز فروشنده</span><span><MapPin size={14}/>تهران · ارسال به سراسر ایران</span><span><PackageCheck size={14}/>{sellerProducts.length.toLocaleString('fa-IR')} کالای فعال</span></div></div><div className="seller-cover-stamp">{seller.trusted ? 'فروشندهٔ منتخب' : 'فروشندهٔ نوا'}</div></div><div className="seller-assurances"><div><BadgeCheck size={18}/><span><b>هویت تأییدشده</b><small>اطلاعات فروشنده بررسی شده است.</small></span></div><div><Truck size={18}/><span><b>ارسال شفاف</b><small>زمان ارسال در صفحهٔ هر کالا مشخص است.</small></span></div><div><Star size={18}/><span><b>عملکرد فروشنده</b><small>امتیاز بر اساس تجربهٔ خریداران نمایشی.</small></span></div></div><div className="section-heading seller-products-heading"><div><p className="eyebrow">ویترین فروشنده</p><h2>محصولات {seller.name}</h2></div><span>{sellerProducts.length.toLocaleString('fa-IR')} کالا</span></div>{sellerProducts.length ? <div className="product-grid">{sellerProducts.map((product) => <ProductCard key={product.id} product={product}/>)}</div> : null}</main>
}
