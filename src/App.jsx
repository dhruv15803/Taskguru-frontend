import { BrowserRouter as Router,Routes,Route } from "react-router-dom"
import Layout from "./Layouts/Layout"
import TodayPending from "./Pages/TodayPending"
import { useState } from "react";
import { nanoid } from "nanoid";
import CompletedTasks from "./Pages/CompletedTasks";
import UpcomingTasks from "./Pages/UpcomingTasks";

function App() {

  const [tasks,setTasks] = useState([]);
  const [isTasks,setisTasks] = useState(false);
  const [emptyTaskErrorMsg,setEmptyTaskErrorMsg] = useState("");
  const [isEdit,setIsEdit] = useState(false);
  const [editId,setEditId] = useState(null);
  const [completedTasks,setCompletedTasks] = useState([]);
  const [formData,setFormData] = useState ({
    "title":"",
    "description":""
  })

  const handleChange = (e)=>{
    const {name,value} = e.target;
    setFormData(prevFormData=>{
      return {
        ...prevFormData,
        [name]:value,
      }
    })
  }

  const addTask = (e)=>{
    e.preventDefault();
    if(isEdit){
      const newTasks = tasks.map((item,i)=>{
        if(item.id===editId){
          return {
            ...item,
            "title":formData.title,
            "description":formData.description,
          }
        }
        else{
          return item;
        }
      })
      setTasks(newTasks);
      setEditId(null);
      setIsEdit(false);
      setisTasks(false);
      setFormData({
        "title":"",
        "description":"",
      })
    }
    else {
      if(formData.title===""){
        setEmptyTaskErrorMsg("Please enter a task");
        setTimeout(()=>{
          setEmptyTaskErrorMsg("");
        },3000)
        return;
      }
      setTasks(prevTasks=>{
        return [
          ...prevTasks,
          {
            "id":nanoid(),
            "title":formData.title,
            "description":formData.description,
          }
        ]
      })
      setisTasks(false);
      setFormData({
        "title":"",
        "description":""
      });
    }
  }

  const completeTask = (id)=>{
    const completedTask = tasks.find(task=>task.id===id);
    setCompletedTasks(prevCompletedTasks=>{
      return [
        ...prevCompletedTasks,
        completedTask,
      ]
    })
    const newTasks = tasks.filter(task=>task.id!==id);
    setTasks(newTasks);
  }

  const clearTasks = ()=>{
    setTasks([]);
  }


  const deleteTask = (id)=>{
    const newTasks = tasks.filter((task)=>task.id!==id);
    setTasks(newTasks);
  }
  
  const editTask = (id)=>{
    const taskToBeEdited = tasks.find(task=>task.id===id);
    setIsEdit(true);
    setisTasks(true);
    setFormData(taskToBeEdited);
    setEditId(id);
  }

  const clearCompleted = ()=>{
    setCompletedTasks([]);
  }

  console.log(completedTasks);

  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<Layout noOfCompleted={completedTasks.length}/>}>
          <Route index element={<TodayPending 
          tasks={tasks} 
          formData={formData} 
          handleChange={handleChange} 
          addTask={addTask}
           isTasks={isTasks}
           setisTasks={setisTasks}
           deleteTask={deleteTask}
           emptyTaskErrorMsg={emptyTaskErrorMsg}
           editTask={editTask}
           isEdit={isEdit}
           completeTask={completeTask}
           clearTasks={clearTasks}
          />}/>
          <Route path="completed" element={<CompletedTasks completedTasks={completedTasks} clearCompleted={clearCompleted}/>}/>
          <Route path="upcoming" element={<UpcomingTasks/>}/>
        </Route>
      </Routes>
    </Router>
    </>
  )
}

export default App
