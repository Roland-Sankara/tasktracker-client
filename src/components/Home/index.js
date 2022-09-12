import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Todo from "./Todo";
import "./index.css";

const Home = () => {
  const [user, setUser] = useState(null);
  const [backlog, setBacklog] = useState([]);
  const [donePile, setDonePile] = useState([]);
  const [task, setTask] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const user =
      localStorage.getItem("todo-user") || sessionStorage.getItem("todo-user");
    if (!user) {
      navigate("/login");
    } else {
      setUser(JSON.parse(user));
    }
  },[navigate]);

  const handleInputValue = (e) => {
    e.preventDefault();
    setTask(e.target.value);
  }

  const addTask = (e) => {
    e.preventDefault();
    setBacklog([{text: task, isComplete: false}, ...backlog]);
    setTask('');
  }

  const commitToDonePile = (id) =>{
    let tasks = backlog;
    tasks[id].isComplete = true;
    setBacklog(tasks);
    let donetasks = tasks.filter((task)=>task.isComplete);
    setDonePile(donetasks)
  }

  const commitToBacklog = (id) =>{
    let tasks = backlog;
    tasks[id].isComplete = false;
    setBacklog(tasks);
    let donetasks = tasks.filter((task)=>task.isComplete);
    setDonePile(donetasks)
  }

  const deleteTask = (id) => {
    let tasks = backlog;
    tasks.splice(id,1);
    setBacklog(tasks);
    let donetasks = tasks.filter((task)=>task.isComplete);
    setDonePile(donetasks)
  }

  return (
    <div className="home-box">
      <h1 className="todo-title">
        <em>{user ? user.username.toUpperCase() + "'s: To-Do-List" : null}</em>
      </h1>

      <div className="input-box">
        <input className="todo-input" type={"text"} placeholder="+ Add task" onChange={handleInputValue} value={task}/>
        <i className="fa-solid fa-arrow-right" onClick={addTask}></i>
      </div>

      <div className="todos-box">
        {backlog.length ? (
          <div className="backlog-pile">
            <h3>
              <i className="fa-solid fa-angle-down"></i> Todos
            </h3>
            {backlog.map((task, id)=>(!task.isComplete && <Todo key={id} text={task.text} done={task.isComplete} remove={()=>deleteTask(id)} handler={()=>commitToDonePile(id)}/>))}
          </div>
        ) : null}

        {backlog.length ? (
          <div className="done-pile">
            <h3>
              <i className="fa-solid fa-angle-down"></i> Done
            </h3>
            {backlog.map((task, id)=>(task.isComplete&& <Todo key={id} text={task.text} done={task.isComplete} remove={()=>deleteTask(id)} handler={()=>commitToBacklog(id)}/>))}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Home;
