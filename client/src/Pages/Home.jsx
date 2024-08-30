import React from 'react'
import { useNavigate } from 'react-router-dom'

const Home = () => {
    const navigate = useNavigate();

    const handleLogout = () =>{
        navigate('/');
    }
  return (
    <div>
     <h1>Welcome!</h1>
     <button onClick={handleLogout}>Logout</button> 
    </div>
  )
}

export default Home
