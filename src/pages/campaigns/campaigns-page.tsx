import { ArrowLeft, BadgePercent, ShieldCheck, Sparkles, Tag } from 'lucide-react'
import { Link } from 'react-router-dom'
import { campaigns } from '@/data/campaigns'
import { products } from '@/data/products'
import { CampaignCard } from '@/components/molecules/campaign-card'
import { ProductCard } from '@/components/molecules/product-card'

export function CampaignsPage() {
  const allCampaignIds = new Set(campaigns.flatMap((campaign) => campaign.productIds))
  const campaignProducts = products.filter((product) => allCampaignIds.has(product.id) && product.originalPrice)
  return <main className="shell page-space campaigns-page">
    <section className="campaigns-hero"><div className="campaigns-hero-copy"><span className="campaigns-kicker"><Sparkles size={15}/> کمپین‌های این روزهای نوا</span><h1>کمپین یعنی یک فرصت مشخص،<br/><span>برای انتخاب بهتر.</span></h1><p>هر کمپین موضوع و زمان خودش را دارد؛ تخفیف و مبلغ صرفه‌جویی هم برای تک‌تک کالاها جدا نمایش داده می‌شود.</p><div className="campaigns-hero-facts"><span><Tag size={15}/>قیمت هر کالا شفاف</span><span><ShieldCheck size={15}/>فروشنده و امتیاز مشخص</span></div></div><div className="campaigns-hero-art"><BadgePercent size={76}/><span>پیشنهادهای<br/>منتخب نوا</span></div></section>
    <div className="campaign-intro-row"><div><p className="eyebrow">رویدادهای خرید</p><h2>کمپین‌های فعال</h2><p>روی هر کمپین بزن تا محصولات، زمان باقی‌مانده و قیمت‌های ویژه‌اش را ببینی.</p></div><Link className="button button-outline" to="/offers">همهٔ کالاهای تخفیف‌دار <ArrowLeft size={15}/></Link></div>
    <section className="campaign-grid" aria-label="کمپین‌های فعال">{campaigns.map((campaign) => <CampaignCard key={campaign.slug} campaign={campaign} productCount={campaign.productIds.filter((id) => products.some((product) => product.id === id && product.originalPrice)).length}/>)}</section>
    <section className="campaign-product-shelf"><div className="section-heading"><div><p className="eyebrow">تخفیف‌های آیتم‌به‌آیتم</p><h2>هر کالا، قیمت و صرفه‌جویی خودش</h2><p className="section-caption">{campaignProducts.length.toLocaleString('fa-IR')} کالا با قیمت قبلی و تخفیف مستقل</p></div><Link className="text-link" to="/offers">دیدن فهرست کامل <ArrowLeft size={14}/></Link></div><div className="product-grid">{campaignProducts.map((product) => <ProductCard key={product.id} product={product}/>)}</div></section>
    <aside className="campaign-fineprint"><ShieldCheck size={17}/><span>این کمپین‌ها برای نمایش تجربهٔ فروشگاهی طراحی شده‌اند؛ داده‌ها و زمان پایان نمونه‌اند و سفارش یا پرداخت واقعی انجام نمی‌شود.</span></aside>
  </main>
}
