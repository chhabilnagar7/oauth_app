import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async()=>{
        try{
            const response = await axios.post('http://localhost:8000/api/login',{email,password});
            if(response.data.success){
                navigate("/home");
            }else{
                alert("Invalid email or password");
            }
        }catch (error){
            console.log(error);
        }
    }

    const handleSocialLogin = (provider) => {
        window.location.href = `http://localhost:8000/auth/${provider}`;
    }


  return (
    <div>
      <h1>Login</h1>
      {/* only email and password and btns */}
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={handleLogin}>Login</button>

      <p>
        Don't have an account? <Link to="/login">Signup</Link>
      </p>

      {/* logins btns */}
      <button onClick={() => handleSocialLogin("google")}>Login with Google</button>
      <button onClick={() => handleSocialLogin("facebook")}>Login with Facebook</button>
      <button onClick={() => handleSocialLogin("github")}>Login with GitHub</button>
      
    </div>
  )
}

export default Login
