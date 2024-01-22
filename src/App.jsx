import { BrowserRouter as Router,Routes,Route } from "react-router-dom"
import Layout from "./Layouts/Layout"
import TodayPending from "./Pages/TodayPending"
import { useEffect, useRef, useState } from "react";
import { nanoid } from "nanoid";
import CompletedTasks from "./Pages/CompletedTasks";
import UpcomingTasks from "./Pages/UpcomingTasks";
import {Howl, Howler} from 'howler';
import boopSound from './Sounds/boop-sound.mp3'
import errSound from './Sounds/error-sound.mp3'



function App() {

  let pendingTasks = JSON.parse(localStorage.getItem('pendingTasks'));
  let completed = JSON.parse(localStorage.getItem('completedTasks'));
  let upcoming = JSON.parse(localStorage.getItem('upcomingTasks'));

  if(pendingTasks===null || pendingTasks===undefined){
    pendingTasks = [];
  }
  if(completed===null || completed === undefined){
    completed = [];
  }
  if(upcoming===null || upcoming===undefined){
    upcoming = [];
  }

  const [tasks,setTasks] = useState(pendingTasks);
  const [upcomingTasks,setUpcomingTasks] = useState(upcoming);
  const [isTasks,setisTasks] = useState(false);
  const [emptyTaskErrorMsg,setEmptyTaskErrorMsg] = useState("");
  const [upcomingEmptyTaskErrorMsg,setUpcomingEmptyTaskErrorMsg] = useState("");
  const [isEdit,setIsEdit] = useState(false);
  const [editId,setEditId] = useState(null);
  const [isUpcomingEdit,setIsUpcomingEdit] = useState(false);
  const [upcomingEditId,setUpcomingEditId] = useState(null);
  const [completedTasks,setCompletedTasks] = useState(completed);
  const inputRef = useRef(null);
  const scrollRef = useRef(null);
  const upcomingInputRef = useRef(null);
  const [formData,setFormData] = useState ({
    "title":"",
    "description":"",
  })
  const [upcomingFormData,setUpcomingFormData] = useState({
    "title":"",
    "description":"",
    "dueDate":new Date().toString(),
  });

  const handleChange = (e)=>{
    const {name,value} = e.target;
    setFormData(prevFormData=>{
      return {
        ...prevFormData,
        [name]:value,
      }
    })
  }

  const handleUpcomingChange = (e)=>{
    const {name,value} = e.target;
    setUpcomingFormData(prevFormData=>{
      return {
        ...prevFormData,
        [name]:value,
      }
    })
  }

  const boopSoundFunction = ()=>{
    let sound = new Howl({
      src:[boopSound],
      rate:2.0,
    });
    sound.play();
  }

  const errorSoundFunction  = ()=>{
    let errorSound = new Howl({
      src:[errSound],
      rate:2.0,
    })
    errorSound.play();
  }

  const addTask = (e)=>{
    e.preventDefault();
    if(isEdit){
      boopSoundFunction();
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
      setisTasks(true);
      setFormData({
        "title":"",
        "description":"",
      })
    }
    else {
      if(formData.title===""){
        errorSoundFunction();
        setEmptyTaskErrorMsg("Please enter a task");
        setTimeout(()=>{
          setEmptyTaskErrorMsg("");
        },3000)
        return;
      }
      inputRef?.current?.focus();
      boopSoundFunction();
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
      setisTasks(true);
      setFormData({
        "title":"",
        "description":"",
      });
    }
  }




  const upcomingAddTask = (e)=>{
    e.preventDefault();
    let currDate = new Date();
    let isOverdue = false;
    const specificDate = new Date(upcomingFormData.dueDate);
    console.log(specificDate < currDate);
    if(specificDate < currDate){
      isOverdue = true;
    }
    else{
      isOverdue = false;
    }    
    if(isUpcomingEdit){
      boopSoundFunction();
      const newUpcomingTasks = upcomingTasks.map((item,i)=>{
        if(upcomingEditId===item.id){
          return {
            ...item,
            "title":upcomingFormData.title,
            "description":upcomingFormData.description,
            "dueDate":upcomingFormData.dueDate,
          }
        }
        else{
          return item;
        }
      })
      setUpcomingTasks(newUpcomingTasks);
      setIsUpcomingEdit(false);
      setUpcomingFormData({
        "title":"",
        "description":"",
        "dueDate":new Date().toString(),
      })
    }    else {
      if(upcomingFormData.title===""){
        errorSoundFunction();
        setUpcomingEmptyTaskErrorMsg("Please enter a task");
        setTimeout(()=>{
          setUpcomingEmptyTaskErrorMsg("");
        },3000)
      }
      else{
        boopSoundFunction();
        setUpcomingTasks(prevUpcomingTasks=> {
          return [
            ...prevUpcomingTasks,
            {
              "id":nanoid(),
              "title":upcomingFormData.title,
              "description":upcomingFormData.description,
              "dueDate":upcomingFormData.dueDate,
              "overdue":isOverdue,
            }
          ]
        })
        upcomingInputRef.current.focus();
        setUpcomingFormData({
          "title":"",
          "description":"",
          "dueDate":new Date().toString(),
        })
      }
    }
  }

  const completeTask = (id)=>{
    boopSoundFunction();

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

  const completeUpcomingTask = (id)=>{
    boopSoundFunction();

    const completedTask = upcomingTasks.find(task=>task.id===id);
    setCompletedTasks(prevCompletedTasks=>{
      return [
        ...prevCompletedTasks,
        completedTask,
      ]
    })
    const newTasks = upcomingTasks.filter(task=>task.id!==id);
    setUpcomingTasks(newTasks);
  }

  const clearTasks = ()=>{
    boopSoundFunction();
    setTasks([]);
    setIsEdit(false);
    setFormData({
      "title":"",
      "description":"",
    })
  }


  const deleteTask = (id)=>{
    boopSoundFunction();
    const newTasks = tasks.filter((task)=>task.id!==id);
    setTasks(newTasks);
  }
  
  const deleteUpcomingTask = (id)=>{
    boopSoundFunction();
    const newUpcomingTasks = upcomingTasks.filter(task => task.id!==id);
    setUpcomingTasks(newUpcomingTasks);
  }


  const editTask = (id)=>{
    boopSoundFunction();
    const taskToBeEdited = tasks.find(task=>task.id===id);
    setIsEdit(true);
    setisTasks(true);
    setFormData(taskToBeEdited);
    setEditId(id);
    scrollRef.current?.scrollIntoView({
      behavior:'smooth',
    })
  }

  const editUpcomingTask = (id)=>{
    setIsUpcomingEdit(true);
    setUpcomingEditId(id);
    const upcomingTaskToBeEdited = upcomingTasks.find(task => task.id===id);
    setUpcomingFormData({
      "title":upcomingTaskToBeEdited.title,
      "description":upcomingTaskToBeEdited.description,
      "dueDate":upcomingTaskToBeEdited.dueDate
    })
  }

  const clearCompleted = ()=>{
    boopSoundFunction();
    setCompletedTasks([]);
  }

  const clearUpcomingTasks = ()=>{
    boopSoundFunction();
    setUpcomingTasks([]);
    setUpcomingFormData({
      "title":"",
      "description":"",
      "dueDate":new Date().toString(),
    })
  }

  useEffect(()=>{
    localStorage.setItem('pendingTasks',JSON.stringify(tasks));
    localStorage.setItem('completedTasks',JSON.stringify(completedTasks));
    localStorage.setItem('upcomingTasks',JSON.stringify(upcomingTasks));
  },[tasks,completedTasks,upcomingTasks])

  console.log(upcomingTasks);


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
           inputRef={inputRef}
           scrollRef={scrollRef}
          />}/>
          <Route path="completed" element={<CompletedTasks
           completedTasks={completedTasks}
           clearCompleted={clearCompleted}
          />}/>
          <Route path="upcoming" element={<UpcomingTasks 
          upcomingTasks={upcomingTasks}
          upcomingFormData={upcomingFormData} 
          handleUpcomingChange={handleUpcomingChange}
          upcomingAddTask={upcomingAddTask}
          upcomingEmptyTaskErrorMsg={upcomingEmptyTaskErrorMsg}
          upcomingInputRef={upcomingInputRef}
          clearUpcomingTasks={clearUpcomingTasks}
          editUpcomingTask={editUpcomingTask}
          deleteUpcomingTask={deleteUpcomingTask}
          completeUpcomingTask={completeUpcomingTask}
          isUpcomingEdit={isUpcomingEdit}
          setUpcomingTasks={setUpcomingTasks}
           />}/>
        </Route>
      </Routes>
    </Router>
    </>
  )
}

export default App
