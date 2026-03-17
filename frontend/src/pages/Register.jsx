// import { useState } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import API from "../api/api";

// function Register() {

//   const navigate = useNavigate();

//   const [name,setName] = useState("");
//   const [email,setEmail] = useState("");
//   const [password,setPassword] = useState("");

//   const handleRegister = async(e) => {

//     e.preventDefault();

//     try {

//       await API.post("/auth/register",{
//         name,
//         email,
//         password
//       });

//       alert("Registration successful");

//       navigate("/");

//     } catch(error) {

//       console.log(error.response?.data);
//       alert(error.response?.data?.message || "Registration failed");

//     }

//   };

//   return(

//     <div className="container">

//       <div className="card">

//         <h2>Create Account</h2>

//         <form onSubmit={handleRegister}>

//           <input
//             placeholder="Name"
//             value={name}
//             onChange={(e)=>setName(e.target.value)}
//           />

//           <input
//             placeholder="Email"
//             value={email}
//             onChange={(e)=>setEmail(e.target.value)}
//           />

//           <input
//             type="password"
//             placeholder="Password"
//             value={password}
//             onChange={(e)=>setPassword(e.target.value)}
//           />

//           <button type="submit">
//             Register
//           </button>

//         </form>

//         <p style={{marginTop:"10px"}}>
//           Already have account? <Link to="/">Login</Link>
//         </p>

//       </div>

//     </div>

//   );

// }

// export default Register;


import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../api/api";

function Register(){

const navigate = useNavigate();

const [name,setName] = useState("");
const [email,setEmail] = useState("");
const [password,setPassword] = useState("");

const handleRegister = async(e)=>{

e.preventDefault();

try{

await API.post("/auth/register",{name,email,password});

navigate("/");

}catch(err){

alert("Registration failed");

}

};

return(

<div className="auth-container">

<div className="auth-card">

<h1 className="logo">Task Manager</h1>

<h2>Create Account</h2>

<form onSubmit={handleRegister}>

<input
placeholder="Full Name"
value={name}
onChange={(e)=>setName(e.target.value)}
/>

<input
placeholder="Email"
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
Register
</button>

</form>

<p className="auth-link">
Already have an account? <Link to="/">Login</Link>
</p>

</div>

</div>

);

}

export default Register;