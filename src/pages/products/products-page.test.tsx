import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { ProductsPage } from '@/pages/products'
import { ShopProvider } from '@/context/shop-provider'

describe('ProductsPage', () => {
  it('applies category selection from the URL to the full product catalog', () => {
    render(<MemoryRouter initialEntries={['/products?category=home']}><ShopProvider><Routes><Route path="/products" element={<ProductsPage/>}/></Routes></ShopProvider></MemoryRouter>)
    expect(screen.getByText(/اسپرسوساز خانگی/)).toBeInTheDocument()
    expect(screen.getByText(/چراغ رومیزی سرامیکی/)).toBeInTheDocument()
    expect(screen.queryByText(/گوشی هوشمند نوا X/)).not.toBeInTheDocument()
  })
})
