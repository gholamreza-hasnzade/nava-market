export type CampaignTheme = 'digital' | 'home' | 'lifestyle'

export interface Campaign {
  slug: string
  title: string
  subtitle: string
  description: string
  badge: string
  theme: CampaignTheme
  endsAt: string
  productIds: string[]
}
