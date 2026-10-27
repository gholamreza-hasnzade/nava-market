import { ArrowLeft, Scale, X } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useShop } from '@/context/shop-provider'

export function CompareTray() {
  const { compare, getProduct, toggleCompare } = useShop()
  if (!compare.length) return null
  return <aside className="compare-tray" aria-label="محصولات انتخاب‌شده برای مقایسه"><div className="compare-tray-icon"><Scale size={18}/></div><div className="compare-tray-copy"><strong>مقایسهٔ کالاها <span>{compare.length.toLocaleString('fa-IR')} / ۴</span></strong><small>{compare.length < 2 ? 'یک محصول دیگر انتخاب کن تا مقایسه شروع شود' : 'ویژگی‌ها را کنار هم ببین و بهتر انتخاب کن'}</small></div><div className="compare-tray-items">{compare.map((id) => { const product = getProduct(id); if (!product) return null; return <span className={`compare-tray-thumb product-image--${product.visualTone}`} key={id} title={product.title}>{product.image ? <img src={product.image} alt=""/> : product.visual}<button type="button" aria-label={`حذف ${product.title} از مقایسه`} onClick={() => toggleCompare(id)}><X size={10}/></button></span> })}</div><Link className={`button ${compare.length < 2 ? 'button-muted' : 'button-primary'}`} to="/compare">مقایسه کن <ArrowLeft size={14}/></Link></aside>
}
