import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ShopProvider } from '@/context/shop-provider'
import { StoreLayout } from '@/components/templates/store-layout'
import { HomePage } from '@/pages/home'
import { ProductDetailPage } from '@/pages/product-detail'
import { CartPage } from '@/pages/cart'
import { CheckoutPage } from '@/pages/checkout'
import { WishlistPage } from '@/pages/wishlist'
import { ComparePage } from '@/pages/compare'
import { OrderSuccessPage } from '@/pages/order-success'
import { NotFoundPage } from '@/pages/not-found'
import { ProductsPage } from '@/pages/products'
import { OffersPage } from '@/pages/offers'
import { SellerDetailPage } from '@/pages/seller-detail'
import { OrdersPage } from '@/pages/orders'

export default function App() {
  return <BrowserRouter><ShopProvider><Routes><Route element={<StoreLayout/>}><Route index element={<HomePage/>}/><Route path="products" element={<ProductsPage/>}/><Route path="products/:slug" element={<ProductDetailPage/>}/><Route path="offers" element={<OffersPage/>}/><Route path="sellers/:sellerName" element={<SellerDetailPage/>}/><Route path="account/orders" element={<OrdersPage/>}/><Route path="cart" element={<CartPage/>}/><Route path="checkout" element={<CheckoutPage/>}/><Route path="wishlist" element={<WishlistPage/>}/><Route path="compare" element={<ComparePage/>}/><Route path="order-success" element={<OrderSuccessPage/>}/><Route path="*" element={<NotFoundPage/>}/></Route></Routes></ShopProvider></BrowserRouter>
}
