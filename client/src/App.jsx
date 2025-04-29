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
import Catalog from "./Page/Catalog";
import CoursePage from "./Page/CoursePage";
import { useSelector } from "react-redux";
import ViewCourse from "./Page/ViewCourse";
import VideoSection from "./Component/CourseComponent/VideoSection";
import Contact from "./Page/Contact";

function App() {
    const {user} = useSelector((state)=> state.profile);
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
        <Route path="/contact" element={<Contact/>}/>
        <Route path="/dashboard/*" element={<Dashboard/>}/>
        <Route path="/catalog/:catalogName" element={<Catalog/>}/>
        <Route path="/catalog/course/:courseID" element={<CoursePage/>}/>

        <Route element={<ViewCourse/>}>
            {
              user && user?.accountType==='Student' && (
                <>
                  <Route path="view-course/:courseId/section/:sectionId/sub-section/:subSectionId" 
                  element={<VideoSection/>}/>
                </>
              )
            }
        </Route>
        
      </Routes>
    </div>

  )
}

export default App
