import { Route, Routes } from 'react-router'
import Home from './pages/Home'
import ProductDetail from './pages/ProductDetail'
import Login from './pages/Login'
import Header from './components/shared/Header'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { getAllProducts } from './store/slices/products.slice'
import { getUserCart } from './store/slices/cart.slice'
import Register from './pages/Register'
import Loading from './components/shared/Loading'
import './App.css'
import Profile from './pages/Profile'
import Cart from './pages/Cart'

function App ()
{
  const dispatch = useDispatch()
  useEffect( () =>
  {
    dispatch( getAllProducts() )
    dispatch( getUserCart() )
  }, [] )

  const { isLoading } = useSelector( state => state )

  return (
    <div className='App-container'>
      <Header />
      { isLoading && <Loading /> }
      <Routes>
        <Route path='/' element={ <Home /> } />
        <Route path='/login' element={ <Login /> } />
        <Route path='/register' element={ <Register /> } />
        <Route path='/profile' element={ <Profile /> } />
        <Route path='/profile' element={ <Profile /> } />
        <Route path='/cart' element={ <Cart /> } />
        <Route path='/product/:id' element={ <ProductDetail /> } />
      </Routes>
    </div>
  )
}

export default App