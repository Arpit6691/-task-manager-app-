//  import {useState} from "react";
// import {useNavigate, Link} from "react-router-dom";
// import API from "../api/api";

// function Login(){

// const navigate = useNavigate();

// const [email,setEmail] = useState("");
// const [password,setPassword] = useState("");

// const handleLogin = async(e)=>{

// e.preventDefault();

// try{

// await API.post("/auth/login",{email,password});

// navigate("/dashboard");

// }catch(err){

// alert("Invalid credentials");

// }

// };

// return(

// <div className="container">

// <div className="card">

// <h2>Login</h2>

// <form onSubmit={handleLogin}>

// <input
// type="email"
// placeholder="Email"
// value={email}
// onChange={(e)=>setEmail(e.target.value)}
// />

// <input
// type="password"
// placeholder="Password"
// value={password}
// onChange={(e)=>setPassword(e.target.value)}
// />

// <button type="submit">
// Login
// </button>

// </form>

// <div className="link">
// <Link to="/register">Create account</Link>
// </div>

// </div>

// </div>

// );

// }

// export default Login;


import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../api/api";

function Login(){

const navigate = useNavigate();

const [email,setEmail] = useState("");
const [password,setPassword] = useState("");

const handleLogin = async(e)=>{

e.preventDefault();

try{

await API.post("/auth/login",{email,password});

navigate("/dashboard");

}catch(err){

alert("Invalid credentials");

}

};

return(

<div className="auth-container">

<div className="auth-card">

<h1 className="logo">Task Manager</h1>

<h2>Welcome Back</h2>

<form onSubmit={handleLogin}>

<input
type="email"
placeholder="Email address"
value={email}
onChange={(e)=>setEmail(e.target.value)}
/>

<input
type="password"
placeholder="Password"
value={password}
onChange={(e)=>setPassword(e.target.value)}
/>

<button type="submit">
Login
</button>

</form>

<p className="auth-link">
Don't have an account? <Link to="/register">Register</Link>
</p>

</div>

</div>

);

}

export default Login;