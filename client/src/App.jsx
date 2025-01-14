import React from "react";
import { Routes, Route } from 'react-router-dom'
import './tailwind.css'
import Home from './routes/Home'
import Navbar from "./components/Navbar";
import Teams from "./routes/Teams";
import TeamsContextProvider from "./contexts/TeamsContext";

const App = () => {
    return (
        <>
        <TeamsContextProvider>
            <Navbar/>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/teams' element={<Teams />} />
            </Routes>
        </TeamsContextProvider>
        </>
    )
}

export default App