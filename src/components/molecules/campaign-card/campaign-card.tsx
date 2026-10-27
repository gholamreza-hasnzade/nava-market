import { ArrowLeft, BadgePercent } from 'lucide-react'
import { Link } from 'react-router-dom'
import type { CampaignCardProps } from '@/types/components/molecules/campaign-card'
import { CampaignCountdown } from '@/components/atoms/campaign-countdown'

export function CampaignCard({ campaign, productCount }: CampaignCardProps) {
  return <article className={`campaign-card campaign-card--${campaign.theme}`}><Link to={`/campaigns/${campaign.slug}`} className="campaign-card-link"><div className="campaign-card-top"><span className="campaign-badge"><BadgePercent size={14}/>{campaign.badge}</span><span className="campaign-card-art" aria-hidden>٪</span></div><div className="campaign-card-copy"><h3>{campaign.title}</h3><p>{campaign.subtitle}</p><small>{productCount.toLocaleString('fa-IR')} کالای تخفیف‌دار · قیمت هر کالا جداگانه</small></div><div className="campaign-card-footer"><CampaignCountdown endsAt={campaign.endsAt} compact/><span className="campaign-visit">دیدن کمپین <ArrowLeft size={15}/></span></div></Link></article>
}
