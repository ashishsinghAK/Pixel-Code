import React from "react"
import "./App.css"
import { Route, Routes } from 'react-router-dom'

import Home from './Page/Home';
import SignUp from "./Page/SignUp";
import Login from "./Page/Login";

function App() {

  return (
    <div className='w-screen min-h-screen bg-slate-950 flex flex-col'>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/signup' element={<SignUp/>}/>
        <Route path='/login' element={<Login/>}/>
      </Routes>
    </div>

  )
}

export default App
