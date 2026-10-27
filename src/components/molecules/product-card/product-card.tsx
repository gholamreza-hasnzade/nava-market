import { useState } from 'react'
import { ArrowLeft, Check, Heart, Plus, Scale, Star } from 'lucide-react'
import type { ProductCardProps } from '@/types/components/molecules/product-card'
import { useShop } from '@/context/shop-provider'
import { formatPrice, discountPercent } from '@/lib/format'
import { Link } from 'react-router-dom'

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart, wishlist, toggleWishlist, compare, toggleCompare } = useShop()
  const [added, setAdded] = useState(false)
  const saved = wishlist.includes(product.id)
  const selectedForCompare = compare.includes(product.id)
  const discount = discountPercent(product.price, product.originalPrice)

  return <article className="product-card">
    <div className={`product-image product-image--${product.visualTone}`}>
      {discount > 0 && <span className="discount-tag">{discount}% تخفیف</span>}
      <button className={`icon-action product-favorite ${saved ? 'is-active' : ''}`} type="button" aria-label={saved ? 'حذف از علاقه‌مندی‌ها' : 'افزودن به علاقه‌مندی‌ها'} aria-pressed={saved} onClick={() => toggleWishlist(product.id)}><Heart size={17} fill={saved ? 'currentColor' : 'none'}/></button>
      <Link to={`/products/${product.slug}`} className="product-image-link" aria-label={`مشاهده ${product.title}`}>
        {product.image ? <img src={product.image} alt={product.title} loading="lazy"/> : <span className="product-emoji" aria-hidden>{product.visual}</span>}
      </Link>
      {product.labels[0] && <span className="product-ribbon">{product.labels[0]}</span>}
    </div>
    <div className="product-card-body">
      <p className="product-category">{product.categoryLabel}</p>
      <Link to={`/products/${product.slug}`} className="product-title">{product.title}</Link>
      <div className="product-rating"><Star size={13} fill="currentColor"/><b>{product.rating.toLocaleString('fa-IR')}</b><span>({product.reviewCount.toLocaleString('fa-IR')})</span><span className="seller-dot"/> <span>{product.seller.name}</span></div>
      <div className="product-card-footer"><div className="product-price">{product.originalPrice && <del>{formatPrice(product.originalPrice)}</del>}<strong>{formatPrice(product.price)}</strong></div><div className="card-actions"><button className={`compare-toggle ${selectedForCompare ? 'is-selected' : ''}`} type="button" aria-label={selectedForCompare ? 'حذف از مقایسه' : 'افزودن به مقایسه'} aria-pressed={selectedForCompare} disabled={compare.length >= 4 && !selectedForCompare} title={compare.length >= 4 && !selectedForCompare ? 'حداکثر ۴ کالا قابل مقایسه است' : undefined} onClick={() => toggleCompare(product.id)}><Scale size={15}/></button><button className={`quick-add ${added ? 'is-added' : ''}`} type="button" onClick={() => { addToCart(product.id); setAdded(true); window.setTimeout(() => setAdded(false), 1000) }} aria-label={`افزودن ${product.title} به سبد خرید`}>{added ? <Check size={15}/> : <Plus size={15}/>}<span>{added ? 'اضافه شد' : 'افزودن'}</span><ArrowLeft size={13}/></button></div></div>
    </div>
  </article>
}
