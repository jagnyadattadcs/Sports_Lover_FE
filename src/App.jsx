import './App.css'
import { Routes, Route } from "react-router-dom";
import PageNotFound from './pages/PageNotFound';
import Home from './components/Home';
import PublicLayout from './layouts/PublicLayout';
import AuthLayout from './layouts/AuthLayout';
import Login from './pages/Login';
import Register from './pages/Register';
import ProductsPage from './components/ProductsPage';
import ProductDetailsPage from './components/ProductDetailsPage';

function App() {
  return (
    <>
      <Routes>
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/track-order" element={<div>Track Order Page</div>} />
          <Route path="/help" element={<div>Help Page</div>} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/products/:category" element={<ProductsPage />} />
          <Route path="/product/:productId" element={<ProductDetailsPage />} />
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
