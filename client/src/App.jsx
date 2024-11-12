import React from "react"
import "./App.css"
import { Route, Routes } from 'react-router-dom'

import Home from './Page/Home';
import SignUp from "./Page/SignUp";
import Login from "./Page/Login";
import NavBar from "./Component/homePage/NavBar";
import ForgotPassword from "./Page/ForgotPassword";
import UpdatePassword from "./Page/UpdatePassword";
import VerifyEmail from "./Page/VerifyEmail";
import About from "./Page/About";
import Dashboard from "./Page/Dashboard";
import Setting from "./Component/DashComponent/Setting";

function App() {

  return (
    <div className='w-screen min-h-screen bg-slate-950 flex flex-col'>
      <NavBar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/login' element={<Login />} />
        <Route path='/forgot-password' element={<ForgotPassword/>}/>
        <Route path='update-password/:id' element={<UpdatePassword/>}/>
        <Route path='/verify-email' element={<VerifyEmail/>}/>
        <Route path="/about" element={<About/>}/>
        <Route path="/dashboard/*" element={<Dashboard/>}/>
        
      </Routes>
    </div>

  )
}

export default App
