// src/App.js
import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from './Context/AuthContext'
import Layout from './Components/Layout';
import Home from './Pages/Home';
import Cart from './Pages/Cart';
import PlaceOrder from './Pages/PlaceOrder';
import AuthPage from './Pages/auth/Auth';
import AdminHome from './Pages/AdminPanel/AdminHome';
import AdminLogin from './Pages/AdminPanel/AdminLogin';
import ViewProductsPage from './Pages/AdminPanel/ViewProducts';
import AddProductsPage from './Pages/AdminPanel/AddProductsPage';
import AdminOrdersPage from './Pages/AdminPanel/Orders';
import AdminUsersPage from './Pages/AdminPanel/Users';
import { createGlobalStyle } from 'styled-components';
import AdminLayout from './Components/Admin/AdminLayout';
import AccountDetails from './Pages/AccountDetails';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import OrderSuccessPage from './Pages/OrderSuccess';
import ProductDetailPage from './Pages/productDetails';


const GlobalStyle = createGlobalStyle`
  #root {
    max-height: 100vh;
  }
`;
const App = () => {
  return (
    <>
      <ToastContainer position="bottom-right" autoClose={3000}/>
    <AuthProvider>
      <GlobalStyle />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/place-order" element={<PlaceOrder />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/order-success" element={<OrderSuccessPage/>} />
             <Route path="/view-product" element={<ProductDetailPage/>} />
             <Route path="/acc-details" element={<AccountDetails/>} />
            
          </Route>

          <Route path='/admin' element={<AdminLayout />}>
            <Route  index element={<AdminHome />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/products" element={<ViewProductsPage />} />
             <Route path="/admin/add-products" element={<AddProductsPage />} />
            <Route path="/admin/orders" element={<AdminOrdersPage/>} />
            <Route path="/admin/users" element={<AdminUsersPage/>} />
          </Route>


        </Routes>
      </BrowserRouter>
    </AuthProvider></>
    
  );
};

export default App;
