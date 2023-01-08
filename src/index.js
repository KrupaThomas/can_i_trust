import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './Home';
import Login from './Login';
import Register from './Register';
import ErrorPage from './ErrorPage';
import Dashboard from './Dashboard';
import Products from './Products';
import EditProduct from './EditProduct';
import Loading from './Loading';
import Transaction from './Transaction';
import { AuthProvider } from './Contexts/AuthContext';

function Index(){
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route index element={<Home/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/login" element={<Login/>}/>
          <Route path="/dashboard" element={<Dashboard/>} />
          <Route path="/edit-products" element={<EditProduct/>} />
          <Route path="/transactions/:id" element={<Transaction/>} />
          <Route path="/products/:id" element={<Products/>}/>
          <Route path="/*" element={<ErrorPage/>} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

ReactDOM.render(
  <Index/>,
  document.getElementById('root')
);