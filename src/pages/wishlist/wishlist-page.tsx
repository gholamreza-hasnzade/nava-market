import { Heart, ShoppingBag } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useShop } from '@/context/shop-provider'
import { ProductCard } from '@/components/molecules/product-card'
import { products } from '@/data/products'

export function WishlistPage() {
  const { wishlist } = useShop()
  const saved = products.filter((product) => wishlist.includes(product.id))
  return <main className="shell page-space"><div className="page-title-row"><div><p className="eyebrow">برای بعد نگه داشته‌ای</p><h1>علاقه‌مندی‌های من</h1><p>{saved.length.toLocaleString('fa-IR')} محصول ذخیره‌شده</p></div><Heart className="page-title-icon" size={25}/></div>{saved.length ? <div className="product-grid">{saved.map((product) => <ProductCard key={product.id} product={product}/>)}</div> : <div className="empty-results"><span><ShoppingBag size={34}/></span><h2>هنوز چیزی ذخیره نکرده‌ای</h2><p>روی قلب هر کالا بزن تا بعداً راحت پیدایش کنی.</p><Link to="/" className="button button-primary">گشتن در فروشگاه</Link></div>}</main>
}
