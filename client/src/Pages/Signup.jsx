import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
    const[name,setName] = useState("");
    const[email,setEmail] = useState("");
    const[password,setPassword] = useState("");
    const navigate = useNavigate();

    //  to handle singup functionality
    const handleSignup = async () => {
        try{
            await axios.post("/api/signup",{name,email,password});
            navigate("/login");

        }catch(error){
            console.log(error);

        }
        
    }

    // to handle login
    const handleSocialLogin = (provider) => {
        window.location.href = `/auth/${provider}`;
    }

  return (
    <div>
      <h1>Signup</h1>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
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

      <button onClick={handleSignup}>Sign Up</button>

      <p>
        Already have an account? <Link to="/login">Login</Link>
      </p>

      {/* logins btns */}
      <button onClick={() => handleSocialLogin("google")}>Sign up with Google</button>
      <button onClick={() => handleSocialLogin("facebook")}>Sign up with Facebook</button>
      <button onClick={() => handleSocialLogin("github")}>Sign up with GitHub</button>
      
    </div>
  );
};

export default Signup;
