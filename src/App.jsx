import './App.css'
import { Routes, Route, Navigate } from "react-router-dom";
import PageNotFound from './pages/PageNotFound';
import Home from './components/Home';
import PublicLayout from './layouts/PublicLayout';
import AuthLayout from './layouts/AuthLayout';
import Login from './pages/Login';
import Register from './pages/Register';
import ProductsPage from './components/ProductsPage';
import ProductDetailsPage from './components/ProductDetailsPage';
import WishlistPage from './pages/WishlistPage';
import CartPage from './pages/CartPage';
import { useAuth } from './context/AuthContext';
import CheckoutPage from './pages/CheckoutPage';
import OrderStatusPage from './pages/OrderStatusPage';
import OrderTrackPage from './pages/OrderTrackPage';
import HelpPage from './pages/HelpPage';
import AccountPage from './pages/AccountPage';

function App() {
  const { user } = useAuth();
  return (
    <>
      <Routes>
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/track-order" element={<OrderTrackPage/>} />
          <Route path="/help" element={<HelpPage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/products/:category" element={<ProductsPage />} />
          <Route path="/product/:productId" element={<ProductDetailsPage />} />
          <Route path="/wishlist" element={<WishlistPage/>} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/account" element={user ? <AccountPage /> : <Navigate to="/login"/>} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/order-status/:orderId?" element={<OrderStatusPage />} />
        </Route>

        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        {/* 404 */}
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  )
}

export default App;
