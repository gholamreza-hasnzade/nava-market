import { beforeEach, describe, expect, it } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { ShopProvider } from '@/context/shop-provider'
import { CheckoutPage } from '@/pages/checkout'
import { OrderSuccessPage } from '@/pages/order-success'

beforeEach(() => {
  localStorage.clear()
  localStorage.setItem('nava-cart-v1', JSON.stringify([{ productId: 'p-101', quantity: 1 }]))
  localStorage.setItem('nava-coupon-v1', 'NAVA10')
})

describe('checkout flow', () => {
  it('validates delivery details, confirms a demo order and persists it', async () => {
    const user = userEvent.setup()
    render(<MemoryRouter initialEntries={['/checkout']}><ShopProvider><Routes><Route path="/checkout" element={<CheckoutPage/>}/><Route path="/order-success" element={<OrderSuccessPage/>}/></Routes></ShopProvider></MemoryRouter>)
    await user.type(screen.getByLabelText('نام و نام خانوادگی'), 'نازنین رضایی')
    await user.type(screen.getByLabelText('شماره موبایل'), '09123456789')
    await user.type(screen.getByLabelText('نشانی کامل'), 'تهران، خیابان ولیعصر، پلاک ۱۰، واحد ۲')
    await user.click(screen.getByRole('button', { name: /ادامه به بررسی سفارش/ }))
    expect(screen.getByText('پرداخت آنلاین (نمایشی)')).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: /ثبت سفارش نمایشی/ }))
    expect(await screen.findByText('ثبت آزمایشی موفق')).toBeInTheDocument()
    await waitFor(() => expect(JSON.parse(localStorage.getItem('nava-orders-v1') ?? '[]')).toHaveLength(1))
    const savedOrder = JSON.parse(localStorage.getItem('nava-orders-v1') ?? '[]')[0]
    expect(savedOrder.discount).toBe(3899000)
    expect(savedOrder.total).toBe(35091000)
    expect(JSON.parse(localStorage.getItem('nava-cart-v1') ?? '[]')).toHaveLength(0)
    expect(localStorage.getItem('nava-coupon-v1')).toBeNull()
  })
})
