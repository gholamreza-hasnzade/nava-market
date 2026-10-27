import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { ProductCard } from '@/components/molecules/product-card'
import { CompareTray } from '@/components/organisms/compare-tray'
import { ShopProvider, useShop } from '@/context/shop-provider'
import { products } from '@/data/products'

function CartProbe() {
  const { cartCount, wishlist, compare } = useShop()
  return <div><span data-testid="cart-count">{cartCount}</span><span data-testid="wishlist-count">{wishlist.length}</span><span data-testid="compare-count">{compare.length}</span></div>
}

describe('ProductCard', () => {
  it('adds a product to the cart, wishlist and compare list', async () => {
    const user = userEvent.setup()
    render(<MemoryRouter><ShopProvider><ProductCard product={products[0]}/><CompareTray/><CartProbe/></ShopProvider></MemoryRouter>)
    await user.click(screen.getByRole('button', { name: /افزودن .* به سبد خرید/ }))
    await user.click(screen.getByRole('button', { name: 'افزودن به علاقه‌مندی‌ها' }))
    await user.click(screen.getByRole('button', { name: 'افزودن به مقایسه' }))
    expect(screen.getByTestId('cart-count')).toHaveTextContent('1')
    expect(screen.getByTestId('wishlist-count')).toHaveTextContent('1')
    expect(screen.getByTestId('compare-count')).toHaveTextContent('1')
    expect(screen.getByRole('link', { name: /مقایسه کن/ })).toBeInTheDocument()
    expect(JSON.parse(localStorage.getItem('nava-cart-v1') ?? '[]')).toEqual([{ productId: 'p-101', quantity: 1 }])
  })
})
