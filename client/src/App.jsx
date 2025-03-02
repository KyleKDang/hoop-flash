import React from "react";
import { Routes, Route } from 'react-router-dom'
import './tailwind.css'
import Home from './routes/Home'
import Navbar from "./components/Navbar";
import Teams from "./routes/Teams";
import Games from "./routes/Games"
import TeamsContextProvider from "./contexts/TeamsContext";
import Login from "./routes/Login";
import Signup from "./routes/Signup";
import AuthContextProvider from "./contexts/AuthContext";

const App = () => {
    return (
        <>
        <AuthContextProvider>
        <TeamsContextProvider>
            <Navbar/>
            <div className='mt-14'>
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/teams' element={<Teams />} />
                    <Route path='/games' element={<Games />} />
                    <Route path='/login' element={<Login />} />
                    <Route path='/signup' element={<Signup />} />
                </Routes>
            </div>
        </TeamsContextProvider>
        </AuthContextProvider>
        </>
    )
}

export default App