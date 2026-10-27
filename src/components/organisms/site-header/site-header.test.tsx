import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { ShopProvider } from '@/context/shop-provider'
import { SiteHeader } from '@/components/organisms/site-header'

describe('SiteHeader', () => {
  it('uses explicit search and utility labels and navigates to search results', async () => {
    const user = userEvent.setup()
    render(<MemoryRouter initialEntries={['/']}><ShopProvider><SiteHeader/><Routes><Route path="/" element={<p>ویترین</p>}/><Route path="/products" element={<p>فهرست کالاها</p>}/></Routes></ShopProvider></MemoryRouter>)
    expect(screen.getByText('پرداخت و ارسال واقعی نیست')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'مقایسهٔ کالاها' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'علاقه‌مندی‌ها' })).toBeInTheDocument()
    await user.type(screen.getByRole('textbox', { name: 'جستجوی کالا' }), 'چراغ رومیزی')
    await user.click(screen.getByRole('button', { name: 'جستجو' }))
    expect(await screen.findByText('فهرست کالاها')).toBeInTheDocument()
  })
})
