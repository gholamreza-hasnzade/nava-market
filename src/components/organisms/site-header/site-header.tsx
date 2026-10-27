import { useEffect, useState } from 'react'
import { ArrowLeft, CircleUserRound, Heart, MapPin, Menu, Search, Scale, ShoppingBag, X } from 'lucide-react'
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
  const submitSearch = (event: SearchFormEvent) => {
    event.preventDefault()
    const value = query.trim()
    navigate(value ? `/products?q=${encodeURIComponent(value)}` : '/products')
  }

  return <>
    <div className="top-strip"><div className="shell top-strip-inner"><span>یک انتخاب خوب، یک خرید آسوده</span><div><span>۷ روز ضمانت بازگشت</span><span className="top-separator"/><span>پشتیبانی هر روز هفته</span></div></div></div>
    <header className="site-header"><div className="shell header-main">
      <button type="button" className="mobile-menu icon-action" aria-label={mobileOpen ? 'بستن منو' : 'بازکردن منو'} onClick={() => setMobileOpen((open) => !open)}>{mobileOpen ? <X size={21}/> : <Menu size={21}/>}</button>
      <Link to="/" className="brand-lockup" aria-label="نوا مارکت، صفحه اصلی"><span className="brand-mark">ن</span><span className="brand-word">نوا<span>مارکت</span></span></Link>
      <form className="search-box" onSubmit={submitSearch} role="search"><Search size={19}/><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="جست‌وجوی کالا، برند یا دسته‌بندی..." aria-label="جستجوی کالا"/><kbd>⌘ K</kbd><button type="submit" aria-label="جستجو"><ArrowLeft size={17}/></button></form>
      <div className="location-wrap"><button className="location-button" type="button" aria-expanded={cityOpen} onClick={() => setCityOpen((open) => !open)}><MapPin size={17}/><span><small>ارسال به</small><strong>{city}</strong></span></button>{cityOpen && <div className="city-popover"><strong>شهر محل تحویل را انتخاب کن</strong>{cities.map((name) => <button type="button" key={name} className={city === name ? 'selected' : ''} onClick={() => { setCity(name); localStorage.setItem('nava-city', name); setCityOpen(false) }}>{name}</button>)}</div>}</div>
      <div className="header-actions"><Link className="header-icon" to="/compare" aria-label="مقایسه محصولات"><Scale size={19}/>{compare.length > 0 && <i>{compare.length}</i>}</Link><Link className="header-icon" to="/wishlist" aria-label="علاقه‌مندی‌ها"><Heart size={19}/>{wishlist.length > 0 && <i>{wishlist.length}</i>}</Link><Link className="header-icon account-shortcut" to="/account/orders" aria-label="سفارش‌های من"><CircleUserRound size={19}/></Link><Link className="cart-button" to="/cart" aria-label="سبد خرید"><ShoppingBag size={19}/><span>سبد خرید</span>{cartCount > 0 && <b>{cartCount.toLocaleString('fa-IR')}</b>}</Link></div>
    </div><nav className={`category-nav ${mobileOpen ? 'category-nav--open' : ''}`} aria-label="دسته‌بندی کالاها"><div className="shell category-nav-inner"><Link to="/products" className="all-categories"><Menu size={15}/>دسته‌بندی کالاها</Link>{categories.map((category) => <Link key={category.id} to={`/products?category=${category.id}`}>{category.name}</Link>)}<Link to="/offers" className="nav-offer">پیشنهادهای ویژه</Link></div></nav></header>
  </>
}
