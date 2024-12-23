import './App.css';
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Policy from './pages/Policy'
import PageNotFound from './pages/PageNotFound';
import Register from './pages/auth/Register';
import Login from './pages/auth/Login';
import Dashboard from './pages/user/Dashboard';
import PrivateRoute from './components/route/Private';
import ForgotPassword from './pages/auth/ForgotPassword';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminRoute from './components/route/AdminRoute';
import CreateCategory from './pages/admin/CreateCategory';
import CreateProduct from './pages/admin/CreateProduct';
import User from './pages/admin/User';
import Profile from './pages/user/Profile';
import Orders from './pages/user/Orders';
import Products from './pages/admin/Products';
import UpdateProduct from './pages/admin/UpdateProduct';
import CartPage from './pages/CartPage';
import ProductDetails from './pages/ProductDetails';

function App() {
  return (
    <>
      <Routes>
        <Route index path="/" element={<Home />} />
          <Route path="/product/:slug" element={<ProductDetails />} />
        <Route path='/About' element={<About />} />
        <Route path='/Contact' element={<Contact />} />
        <Route path='/Policy' element={<Policy />} />
        <Route path='/SignUp' element={<Register />} />
        <Route path='/Login' element={<Login />} />
        <Route path='/cart' element={<CartPage />} />

        <Route path='*' element={<PageNotFound />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* User Routes */}
        <Route path="/Dashboard" element={<PrivateRoute />}>
          <Route path="user" element={<Dashboard />} />
          <Route path="user/profile" element={<Profile />} />
          <Route path="user/orders" element={<Orders />} />
        </Route>

        {/* Admin Routes */}
        <Route path="/Dashboard" element={<AdminRoute />}>
          <Route path="admin" element={<AdminDashboard />} />\
          <Route path="admin/create-category" element={<CreateCategory />} />
          <Route path="admin/create-product" element={<CreateProduct />} />
          <Route path="admin/update-product/:slug" element={<UpdateProduct />} />
          <Route path="admin/products" element={<Products />} />
          <Route path="admin/users" element={<User />} />
        </Route>

      </Routes>
    </>
  );
}

export default App;
