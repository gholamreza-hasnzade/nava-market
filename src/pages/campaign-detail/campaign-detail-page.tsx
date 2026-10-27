import { ArrowLeft, BadgePercent, ChevronLeft, PackageCheck, ShieldCheck, Tag } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import { campaigns } from '@/data/campaigns'
import { products } from '@/data/products'
import { CampaignCountdown } from '@/components/atoms/campaign-countdown'
import { ProductCard } from '@/components/molecules/product-card'
import { discountPercent, formatPrice } from '@/lib/format'

export function CampaignDetailPage() {
  const { slug } = useParams()
  const campaign = campaigns.find((item) => item.slug === slug)
  if (!campaign) return <main className="shell page-space"><div className="empty-results"><span>؟</span><h2>این کمپین را پیدا نکردیم</h2><Link className="button button-primary" to="/campaigns">دیدن کمپین‌های فعال</Link></div></main>
  const campaignItems = campaign.productIds.map((id) => products.find((product) => product.id === id)).filter((product) => product?.originalPrice).sort((a, b) => discountPercent(b!.price, b!.originalPrice) - discountPercent(a!.price, a!.originalPrice))
  const topDiscount = campaignItems.reduce((max, product) => Math.max(max, discountPercent(product!.price, product!.originalPrice)), 0)
  const maxSaving = campaignItems.reduce((maximum, product) => Math.max(maximum, product!.originalPrice! - product!.price), 0)

  return <main className="shell page-space campaign-detail-page"><div className="breadcrumb"><Link to="/">ویترین نوا</Link><ChevronLeft size={14}/><Link to="/campaigns">کمپین‌ها</Link><ChevronLeft size={14}/><span className="current">{campaign.title}</span></div>
    <section className={`campaign-detail-hero campaign-detail-hero--${campaign.theme}`}><div className="campaign-detail-copy"><span className="campaign-badge"><BadgePercent size={15}/>{campaign.badge}</span><p className="eyebrow">کمپین انتخاب نوا</p><h1>{campaign.title}</h1><h2>{campaign.subtitle}</h2><p>{campaign.description}</p><CampaignCountdown endsAt={campaign.endsAt}/></div><div className="campaign-detail-stats"><div><strong>{campaignItems.length.toLocaleString('fa-IR')}</strong><span>کالای تخفیف‌دار</span></div><div><strong>{topDiscount.toLocaleString('fa-IR')}٪</strong><span>بیشترین تخفیف</span></div><div><strong>{formatPrice(maxSaving)}</strong><span>بیشترین صرفه‌جویی روی یک کالا</span></div></div><span className="campaign-detail-watermark">٪</span></section>
    <div className="campaign-products-heading"><div><p className="eyebrow">قیمت هر محصول جداگانه</p><h2>کالاهای این کمپین</h2><p>قیمت قبلی، قیمت فعلی و مبلغی که روی همان کالا صرفه‌جویی می‌کنی، روی هر کارت مشخص است.</p></div><span><PackageCheck size={17}/>{campaignItems.length.toLocaleString('fa-IR')} کالا</span></div>
    <section className="campaign-item-grid" aria-label="محصولات کمپین">{campaignItems.length ? campaignItems.map((product) => <article className="campaign-item" key={product!.id}><div className="campaign-item-head"><span><Tag size={13}/>پیشنهاد این کمپین</span><b>{discountPercent(product!.price, product!.originalPrice).toLocaleString('fa-IR')}٪ تخفیف</b></div><ProductCard product={product!}/><div className="campaign-item-saving"><span>صرفه‌جویی برای همین کالا</span><strong>{formatPrice(product!.originalPrice! - product!.price)}</strong></div></article>) : <div className="empty-results"><h2>فعلاً کالایی برای این کمپین موجود نیست</h2><Link to="/offers" className="button button-primary">دیدن تخفیف‌های دیگر</Link></div>}</section>
    <aside className="campaign-trust-note"><ShieldCheck size={18}/><div><b>تخفیف‌ها جدا از هم محاسبه می‌شوند</b><p>هر برچسب تخفیف و مبلغ صرفه‌جویی به قیمت همان کالا مربوط است؛ تخفیف کمپین به‌صورت خودکار روی اقلام نامرتبط اعمال نمی‌شود.</p></div><Link to="/offers">همهٔ تخفیف‌ها <ArrowLeft size={14}/></Link></aside>
  </main>
}
