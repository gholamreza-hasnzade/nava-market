import { beforeEach, describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { ShopProvider } from '@/context/shop-provider'
import { CartPage } from '@/pages/cart'
import { HomePage } from '@/pages/home'

beforeEach(() => {
  localStorage.clear()
  localStorage.setItem('nava-cart-v1', JSON.stringify([{ productId: 'p-101', quantity: 1 }]))
})

describe('CartPage', () => {
  it('applies the demo coupon and reflects the discounted order total', async () => {
    const user = userEvent.setup()
    render(<MemoryRouter initialEntries={['/cart']}><ShopProvider><Routes><Route path="/cart" element={<CartPage/>}/><Route path="/" element={<HomePage/>}/></Routes></ShopProvider></MemoryRouter>)
    await user.type(screen.getByLabelText('کد تخفیف'), 'NAVA10')
    await user.click(screen.getByRole('button', { name: 'اعمال' }))
    expect(screen.getByText('۱۰٪ تخفیف اعمال شد.')).toBeInTheDocument()
    expect(screen.getByText(/۳٬۸۹۹٬۰۰۰/)).toBeInTheDocument()
  })
})
