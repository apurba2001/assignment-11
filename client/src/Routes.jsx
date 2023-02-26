import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './components/Home/Home'
import Player from './components/Auth/Player'
import Admin from './components/Auth/Admin'

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/player-auth' element={<Player />} />
                <Route path='/admin-auth' element={<Admin />} />
            </Routes>
        </BrowserRouter>
    )
}

export default Router