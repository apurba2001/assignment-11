import React from 'react'
import './Home.css'
import { Link } from 'react-router-dom'

const Home = () => {
    return (
        <div className='home-container'>
            <Link to='player-auth'><button className='player-btn'>Player Login</button></Link>
            <Link to="/admin-auth"><button className='admin-btn'>Admin Login</button></Link>
        </div>
    )
}

export default Home