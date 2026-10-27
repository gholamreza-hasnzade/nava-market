import { describe, expect, it } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { ShopProvider } from '@/context/shop-provider'
import { ProductDetailPage } from '@/pages/product-detail'

describe('ProductDetailPage', () => {
  it('shows specification and review tabs, then saves a product question locally', async () => {
    const user = userEvent.setup()
    render(<MemoryRouter initialEntries={['/products/nava-x-smartphone']}><ShopProvider><Routes><Route path="/products/:slug" element={<ProductDetailPage/>}/></Routes></ShopProvider></MemoryRouter>)
    await user.click(screen.getByRole('tab', { name: 'مشخصات فنی' }))
    const displayRow = screen.getByText('نمایشگر').closest('tr')
    expect(displayRow).toHaveTextContent('۶.۷ اینچی AMOLED')
    expect(displayRow?.querySelectorAll('th, td')).toHaveLength(2)
    await user.click(screen.getByRole('tab', { name: /دیدگاه خریداران/ }))
    expect(screen.getByText('این دیدگاه‌ها برای نمایش رابط کاربری فروشگاه نمونه هستند.')).toBeInTheDocument()
    await user.click(screen.getByRole('tab', { name: 'پرسش و پاسخ' }))
    await user.type(screen.getByLabelText('پرسش تو'), 'گارانتی محصول چه مدت است؟')
    await user.click(screen.getByRole('button', { name: /ثبت پرسش/ }))
    expect(await screen.findByText('گارانتی محصول چه مدت است؟')).toBeInTheDocument()
    await waitFor(() => expect(JSON.parse(localStorage.getItem('nava-questions-p-101') ?? '[]')).toHaveLength(1))
  })
})
