import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { ShopProvider } from '@/context/shop-provider'
import { CampaignsPage } from '@/pages/campaigns'
import { CampaignDetailPage } from '@/pages/campaign-detail'

describe('campaign pages', () => {
  it('opens a themed campaign and shows its separate item discounts', async () => {
    const user = userEvent.setup()
    render(<MemoryRouter initialEntries={['/campaigns']}><ShopProvider><Routes><Route path="/campaigns" element={<CampaignsPage/>}/><Route path="/campaigns/:slug" element={<CampaignDetailPage/>}/></Routes></ShopProvider></MemoryRouter>)
    expect(screen.getByRole('heading', { name: 'کمپین‌های فعال' })).toBeInTheDocument()
    await user.click(screen.getByRole('link', { name: /روزهای دیجیتال نوا/ }))
    expect(await screen.findByRole('heading', { name: 'روزهای دیجیتال نوا' })).toBeInTheDocument()
    expect(screen.getByText('قیمت قبلی، قیمت فعلی و مبلغی که روی همان کالا صرفه‌جویی می‌کنی، روی هر کارت مشخص است.')).toBeInTheDocument()
  })

  it('offers a link from item discounts to the separate campaign hub', async () => {
    const user = userEvent.setup()
    const { OffersPage } = await import('@/pages/offers')
    render(<MemoryRouter initialEntries={['/offers']}><ShopProvider><Routes><Route path="/offers" element={<OffersPage/>}/><Route path="/campaigns" element={<CampaignsPage/>}/></Routes></ShopProvider></MemoryRouter>)
    expect(screen.getByRole('heading', { name: /تخفیف را/ })).toBeInTheDocument()
    expect(screen.getAllByText(/صرفه‌جویی/).length).toBeGreaterThan(0)
    await user.click(screen.getByRole('link', { name: /رفتن به کمپین‌ها/ }))
    expect(await screen.findByRole('heading', { name: 'کمپین‌های فعال' })).toBeInTheDocument()
  })
})
