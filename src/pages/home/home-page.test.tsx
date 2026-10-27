import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { HomePage } from '@/pages/home'
import { ShopProvider } from '@/context/shop-provider'

describe('HomePage', () => {
  it('filters the catalog from the search query', () => {
    render(<MemoryRouter initialEntries={['/?q=هدفون']}><ShopProvider><Routes><Route path="/" element={<HomePage/>}/></Routes></ShopProvider></MemoryRouter>)
    expect(screen.getByText(/هدفون بی‌سیم/)).toBeInTheDocument()
    expect(screen.queryByText(/اسپرسوساز خانگی/)).not.toBeInTheDocument()
  })
})
