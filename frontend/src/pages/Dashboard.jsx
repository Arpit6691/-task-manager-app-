 import { useEffect, useState } from "react";
import API from "../api/api";
import { useNavigate } from "react-router-dom";

function Dashboard(){

const navigate = useNavigate();

const [tasks,setTasks] = useState([]);
const [title,setTitle] = useState("");
const [description,setDescription] = useState("");
const [search,setSearch] = useState("");
const [status,setStatus] = useState("");
const [page,setPage] = useState(1);

const fetchTasks = async()=>{

try{

const res = await API.get(`/tasks?page=${page}&search=${search}&status=${status}`);

setTasks(res.data.tasks);

}catch(err){
console.log(err);
}

};

useEffect(()=>{
fetchTasks();
},[page,search,status]);


const createTask = async()=>{

if(!title) return alert("Task title required");

try{

await API.post("/tasks",{
title,
description,
status:"pending"
});

setTitle("");
setDescription("");

fetchTasks();

}catch(err){
console.log(err);
}

};

const deleteTask = async(id)=>{

try{

await API.delete(`/tasks/${id}`);
fetchTasks();

}catch(err){
console.log(err);
}

};

const updateStatus = async(id,status)=>{

try{

await API.put(`/tasks/${id}`,{status});
fetchTasks();

}catch(err){
console.log(err);
}

};

const logout = async()=>{

try{

await API.post("/auth/logout");
navigate("/");

}catch(err){
console.log(err);
}

};


return(

<div>

{/* NAVBAR */}

<div className="navbar">

<h2>Task Manager</h2>

<button className="logout-btn" onClick={logout}>
Logout
</button>

</div>


<div className="dashboard-container">

<h2>Task Dashboard</h2>

{/* CREATE TASK */}

<div className="task-form">

<input
placeholder="Task title"
value={title}
onChange={(e)=>setTitle(e.target.value)}
/>

<input
placeholder="Description"
value={description}
onChange={(e)=>setDescription(e.target.value)}
/>

<button onClick={createTask}>
Create
</button>

</div>


{/* SEARCH + FILTER */}

<div className="task-controls">

<input
placeholder="Search task"
value={search}
onChange={(e)=>setSearch(e.target.value)}
/>

<select onChange={(e)=>setStatus(e.target.value)}>

<option value="">All</option>
<option value="pending">Pending</option>
<option value="completed">Completed</option>

</select>

</div>


{/* TASK LIST */}

<div className="task-list">

{tasks.map(task=>(

<div key={task._id} className="task-card">

<div>

<h3>{task.title}</h3>

<p>{task.description}</p>

<span className={`status ${task.status}`}>
{task.status}
</span>

</div>

<div className="task-actions">

<button
className="complete-btn"
onClick={()=>updateStatus(task._id,"completed")}
>
Complete
</button>

<button
className="delete-btn"
onClick={()=>deleteTask(task._id)}
>
Delete
</button>

</div>

</div>

))}

</div>


{/* PAGINATION */}

<div className="pagination">

<button
onClick={()=>setPage(page-1)}
disabled={page===1}
>
Previous
</button>

<button
onClick={()=>setPage(page+1)}
>
Next
</button>

</div>

</div>

</div>

);

}

export default Dashboard;