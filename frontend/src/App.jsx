import react from "react"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Home from "./pages/Home"
import NotFound from "./pages/NotFound"
import ProtectedRoute from "./components/ProtectedRoutes"
import Instructions from "./pages/Instructions"

function Logout(){
  localStorage.clear() //clears access and refresh tokens 
  return <Navigate to="/login"/>
}

function RegisterAndLogout(){
  localStorage.clear()
  return <Register/>
}

function App() {
  

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={
          <ProtectedRoute>
            <Home/>
          </ProtectedRoute>
        }/>
        <Route path = "/login" element={<Login/>}/>
        <Route path = "/logout" element={<Logout/>}/>
        <Route path = "/register" element={<RegisterAndLogout/>}/>
        <Route path = "*" element={<NotFound/>}/>
        <Route path = "/about" element={<Instructions/>}/>

      </Routes>
    
    </BrowserRouter>
  )
}

export default App
