import { useState } from "react"
import { BrowserRouter, Routes, Route, NavLink, Link } from "react-router-dom"
import { MainLayout } from "./MainLayout.jsx"
import { Home, Courses, Course, Student, Students, Enroll, NewCourse, NewStudent, PageNotFound } from "./MainComponents.jsx"
import './App.css'

function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout/>}>
          <Route index element={<Home/>}/>
          <Route path="/courses">
            <Route index element={<Courses/>}/>
            <Route path=":id" element={<Course/>}/> 
          </Route>
          <Route path="/students">
            <Route index element={<Students/>}/>
            <Route path=":id" element={<Student/>}/> 
          </Route>
          <Route path="/enroll" element={<Enroll/>} />
          <Route path="/newcourse" element={<NewCourse/>} />
          <Route path="/newstudent" element={<NewStudent/>} />
          <Route path="*" element={<PageNotFound/>} />
        </Route>
      </Routes>
    </BrowserRouter>
    </>
  )
}
                                                                                                    
export default App