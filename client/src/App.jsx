import React from "react";
import { Routes, Route } from 'react-router-dom'
import './tailwind.css'
import Home from './routes/Home'
import Navbar from "./components/Navbar";
import Teams from "./routes/Teams";

const App = () => {
    return (
        <>
        <Navbar />
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/teams' element={<Teams />} />
        </Routes>
        </>
    )
}

export default App