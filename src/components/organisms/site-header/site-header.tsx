import { useEffect, useState } from 'react'
import { CircleUserRound, Heart, LayoutGrid, MapPin, Menu, Search, Scale, ShoppingBag, X } from 'lucide-react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { useShop } from '@/context/shop-provider'
import { categories } from '@/data/products'
import type { SearchFormEvent } from '@/types/components/organisms/site-header'

export function SiteHeader() {
  const { cartCount, wishlist, compare } = useShop()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const [query, setQuery] = useState(searchParams.get('q') ?? '')
  const [mobileOpen, setMobileOpen] = useState(false)
  const [cityOpen, setCityOpen] = useState(false)
  const [city, setCity] = useState(() => localStorage.getItem('nava-city') ?? 'تهران')
  const cities = ['تهران', 'کرج', 'اصفهان', 'شیراز', 'مشهد']

  useEffect(() => { setQuery(searchParams.get('q') ?? '') }, [searchParams])
  useEffect(() => {
    if (!mobileOpen) return
    const closeOnEscape = (event: KeyboardEvent) => { if (event.key === 'Escape') setMobileOpen(false) }
    window.addEventListener('keydown', closeOnEscape)
    return () => window.removeEventListener('keydown', closeOnEscape)
  }, [mobileOpen])

  const submitSearch = (event: SearchFormEvent) => {
    event.preventDefault()
    const value = query.trim()
    navigate(value ? `/products?q=${encodeURIComponent(value)}` : '/products')
    setMobileOpen(false)
  }
  const closeMenu = () => setMobileOpen(false)

  return <>
    <div className="top-strip"><div className="shell top-strip-inner"><span>مارکت‌پلیس چندفروشنده‌ای نوا</span><div><span>نسخهٔ نمایشی</span><span className="top-separator"/><span>پرداخت و ارسال واقعی نیست</span></div></div></div>
    <header className="site-header"><div className="shell header-main">
      <button type="button" className="mobile-menu icon-action" aria-label={mobileOpen ? 'بستن فهرست' : 'بازکردن فهرست'} aria-expanded={mobileOpen} aria-controls="main-navigation" onClick={() => setMobileOpen((open) => !open)}>{mobileOpen ? <X size={21}/> : <Menu size={21}/>}</button>
      <Link to="/" className="brand-lockup" aria-label="نوا مارکت، صفحهٔ اصلی" onClick={closeMenu}><span className="brand-mark">ن</span><span className="brand-word">نوا<span>مارکت</span></span></Link>
      <form className="search-box" onSubmit={submitSearch} role="search"><Search size={19}/><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="نام کالا یا برند را جست‌وجو کن" aria-label="جستجوی کالا"/><button type="submit"><span>جستجو</span></button></form>
      <div className="location-wrap"><button className="location-button" type="button" aria-expanded={cityOpen} onClick={() => setCityOpen((open) => !open)}><MapPin size={17}/><span><small>مقصد ارسال</small><strong>{city}</strong></span><span className="location-change">تغییر</span></button>{cityOpen && <div className="city-popover"><strong>شهر تحویل را انتخاب کن</strong>{cities.map((name) => <button type="button" key={name} className={city === name ? 'selected' : ''} onClick={() => { setCity(name); localStorage.setItem('nava-city', name); setCityOpen(false) }}>{name}</button>)}</div>}</div>
      <div className="header-actions"><Link className="header-icon compare-shortcut" to="/compare" aria-label="مقایسهٔ کالاها"><Scale size={18}/><span>مقایسه</span>{compare.length > 0 && <i>{compare.length}</i>}</Link><Link className="header-icon wishlist-shortcut" to="/wishlist" aria-label="علاقه‌مندی‌ها"><Heart size={18}/><span>علاقه‌مندی</span>{wishlist.length > 0 && <i>{wishlist.length}</i>}</Link><Link className="header-icon account-shortcut" to="/account/orders" aria-label="سفارش‌های من"><CircleUserRound size={18}/><span>سفارش‌ها</span></Link><Link className="cart-button" to="/cart" aria-label="سبد خرید"><ShoppingBag size={18}/><span>سبد خرید</span>{cartCount > 0 && <b>{cartCount.toLocaleString('fa-IR')}</b>}</Link></div>
    </div><nav id="main-navigation" className={`category-nav ${mobileOpen ? 'category-nav--open' : ''}`} aria-label="دسته‌بندی و دسترسی‌های فروشگاه"><div className="shell category-nav-inner"><Link to="/products" className="all-categories" onClick={closeMenu}><LayoutGrid size={15}/>همهٔ کالاها</Link>{categories.map((category) => <Link key={category.id} to={`/products?category=${category.id}`} onClick={closeMenu}>{category.name}</Link>)}<Link to="/offers" className="nav-offer" onClick={closeMenu}>تخفیف کالاها</Link><Link to="/campaigns" className="nav-campaigns" onClick={closeMenu}>کمپین‌ها</Link><div className="nav-shortcuts"><Link to="/wishlist" onClick={closeMenu}><Heart size={13}/>ذخیره‌شده‌ها</Link><Link to="/compare" onClick={closeMenu}><Scale size={13}/>مقایسه</Link><Link to="/account/orders" onClick={closeMenu}><CircleUserRound size={13}/>سفارش‌ها</Link></div></div></nav></header>
  </>
}
