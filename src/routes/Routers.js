

import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Home from '../pages/Home'
import AllFoods from '../pages/AllFoods'
import FoodDetails from '../pages/FoodDetail'
import Cart from '../pages/Cart'
import Checkout from '../pages/Checkout'
import Login from '../pages/Login'
import Register from '../pages/Register'
const Routers = () => {
  return <Routes>
    <Route exact path='/Fastdemo' element={<Home/>} />
    <Route path='/foods/:id' element={<FoodDetails/>} />
    <Route path='/foods' element={<AllFoods/>} />
    <Route path='/cart' element={<Cart/>} />
    <Route path='/checkout' element={<Checkout/>} />
    <Route path='/login' element={<Login/>} />
    <Route path='/register' element={<Register/>} />
   
    
  </Routes>
}

export default Routers
