
import React from "react";
import { BrowserRouter as Router,Routes,Route } from "react-router-dom"
import Layout from "./Layouts/Layout"
import TodayPending from "./Pages/TodayPending"
import { createContext, useEffect, useRef, useState } from "react";
import { nanoid } from "nanoid";
import CompletedTasks from "./Pages/CompletedTasks";
import UpcomingTasks from "./Pages/UpcomingTasks";
import {Howl, Howler} from 'howler';
import boopSound from './Sounds/boop-sound.mp3'
import errSound from './Sounds/error-sound.mp3';
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import axios from 'axios'

export const ListContext = React.createContext();


function App() {

  // let pendingTasks = JSON.parse(localStorage.getItem('pendingTasks'));
  // let completed = JSON.parse(localStorage.getItem('completedTasks'));
  // let upcoming = JSON.parse(localStorage.getItem('upcomingTasks'));

  // if(pendingTasks===null || pendingTasks===undefined){
  //   pendingTasks = [];
  // }
  // if(completed===null || completed === undefined){
  //   completed = [];
  // }
  // if(upcoming===null || upcoming===undefined){
  //   upcoming = [];
  // }
  const [isAddingPendingTask,setIsAddingPendingTask] = useState(false);

  const [tasks,setTasks] = useState([]);
  const [upcomingTasks,setUpcomingTasks] = useState([]);
  const [isTasks,setisTasks] = useState(false);
  const [emptyTaskErrorMsg,setEmptyTaskErrorMsg] = useState("");
  const [upcomingEmptyTaskErrorMsg,setUpcomingEmptyTaskErrorMsg] = useState("");
  const [isEdit,setIsEdit] = useState(false);
  const [editId,setEditId] = useState(null);
  const [isUpcomingEdit,setIsUpcomingEdit] = useState(false);
  const [upcomingEditId,setUpcomingEditId] = useState(null);
  const [completedTasks,setCompletedTasks] = useState([]);
  const inputRef = useRef(null);
  const scrollRef = useRef(null);
  const upcomingInputRef = useRef(null);
  const [loggedInUser,setLoggedInUser] = useState(null);
  const [registerErrorMsg,setRegisterErrorMsg] = useState("");
  const [loginErrorMsg,setLoginErrorMsg] = useState("");
  const [registerFormData,setRegisterFormData] = useState({
    "username":"",
    "email":"",
    "password":"",
  })
  const [loginFormData,setLoginFormData] = useState({
    "email":"",
    "password":"",
  })
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

  const postTask = async ()=>{
    try {
      const response = await axios.post('http://localhost:5000/tasks/add',{
        "id":nanoid(),
        "title":formData.title,
        "description":formData.description,
      },{
        withCredentials:true,
      });
      console.log(response); 
      setTasks(prevTasks=>{
        return [
          ...prevTasks,
          {
            "id":response.data.task.id,
            "title":response.data.task.title,
            "description":response.data.task.description,
          }
        ]
      })
    } catch (error) {
      console.log(error);
    }
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
      const postEdit = async ()=>{
        try {
          const response = await axios.post('http://localhost:5000/tasks/update',{
            "newTitle":formData.title,
            "newDescription":formData.description,
            "id":editId,
          },{
            withCredentials:true,
          })
          console.log(response);
        } catch (error) {
          console.log(error);
        }
      }
      postEdit();
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
      postTask();
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
            "overdue":isOverdue,
          }
        }
        else{
          return item;
        }
      })
      const postUpdateUpcoming = async ()=>{
        try {
                const res = await axios.post('http://localhost:5000/upcomingTasks/update',{
                  "id":upcomingEditId,
                  "newTitle":upcomingFormData.title,
                  "newDescription":upcomingFormData.description,
                  "newDueDate":upcomingFormData.dueDate,
                  "newOverDue":isOverdue,
                },{withCredentials:true})
                console.log(res);
        } catch (error) {
          console.log(error);
        }
            }
      postUpdateUpcoming();
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
        const postUpcomingTask = async ()=>{
          try {
            const response = await axios.post('http://localhost:5000/upcomingTasks/add',{
                "id":nanoid(),
                "title":upcomingFormData.title,
                "description":upcomingFormData.description,
                "dueDate":upcomingFormData.dueDate,
                "overdue":isOverdue,
              },{withCredentials:true});
              console.log(response);
            } catch (error) {
              console.log(error);
          } 
        }
        postUpcomingTask();
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
    const postComplete = async ()=>{
      try {
        const res = await axios.post('http://localhost:5000/tasks/complete',{id},{withCredentials:true});
        console.log(res); 
      } catch (error) {
        console.log(error);
      }
    }
    postComplete();
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
    const postComplete = async ()=>{
      try {
        const res = await axios.post('http://localhost:5000/tasks/complete',{id},{withCredentials:true});
        console.log(res); 
      } catch (error) {
        console.log(error);
      }
    }
    postComplete();
    const newTasks = upcomingTasks.filter(task=>task.id!==id);
    setUpcomingTasks(newTasks);
  }

  const clearTasks = ()=>{
    boopSoundFunction();
    const postClearAllTasks = async ()=>{
try {
        const response = await axios.get('http://localhost:5000/tasks/deleteAll',{
          withCredentials:true,
        });
        console.log(response);
} catch (error) {
  console.log(error);
}
    }
    postClearAllTasks();
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
    const postDelete = async ()=>{
      try {
        const response = await axios.post('http://localhost:5000/tasks/delete',{
          id,
        },{
          withCredentials:true,
        })
        console.log(response); 
      } catch (error) {
        console.log(error);
      }
    }
    postDelete();
    setTasks(newTasks);
  }
  
  const deleteUpcomingTask = (id)=>{
    boopSoundFunction();
    const newUpcomingTasks = upcomingTasks.filter(task => task.id!==id);
    const postDeleteUpcoming = async ()=>{
      try {
        const response = await axios.post('http://localhost:5000/upcomingTasks/delete',{
          id,
        },{withCredentials:true})
        console.log(response); 
      } catch (error) {
        console.log(error);
      }
    }
    postDeleteUpcoming();
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
    boopSoundFunction();
    setIsUpcomingEdit(true);
    setIsAddingPendingTask(true);
    setUpcomingEditId(id);
    const upcomingTaskToBeEdited = upcomingTasks.find(task => task.id===id);
    setUpcomingFormData(upcomingTaskToBeEdited);
  }

  const clearCompleted = ()=>{
    boopSoundFunction();
    setCompletedTasks([]);
    const deleteAllCompleted = async ()=>{
try {
        const res = await axios.get('http://localhost:5000/tasks/deleteCompleted',{withCredentials:true});
        console.log(res);
} catch (error) {
  console.log(error);
}
    }
    deleteAllCompleted();
  }

  const clearUpcomingTasks = ()=>{
    boopSoundFunction();
    const clearUpcoming = async ()=>{
try {
        const res = await axios.get('http://localhost:5000/upcomingTasks/deleteAll',{withCredentials:true});
        console.log(res);
} catch (error) {
  console.log(error);
}
    }
    clearUpcoming();
    setUpcomingTasks([]);
    setUpcomingFormData({
      "title":"",
      "description":"",
      "dueDate":new Date().toString(),
    })
  }

  const handleRegisterFormChange = (e)=>{
    const {name,value} = e.target;
    setRegisterFormData(prevFormData=>{
      return {
        ...prevFormData,
        [name]:value,
      }
    })
  }

  const handleLoginFormChange = (e)=>{
    const {name,value} = e.target;
    setLoginFormData(prevFormData=>{
      return {
        ...prevFormData,
        [name]:value,
      }
    })
  }
  

  const registerUser = (e)=>{
    e.preventDefault();
    try {
      const postRegisterData = async ()=>{
        const response = await axios.post('http://localhost:5000/user/register',registerFormData);
        setRegisterErrorMsg(response.data.message);
          setTimeout(()=>{
            setRegisterErrorMsg('');
          },3000)
      }
      postRegisterData();
      setRegisterFormData({
        "username":"",
        "email":"",
        "password":""
      })
    } catch (error) {
      console.log(error);
    }
  }

  const loginUser = (e)=>{
    e.preventDefault();
    try {
      const postLoginData = async ()=>{
        const response = await axios.post('http://localhost:5000/user/login',loginFormData,{
          withCredentials:true,
        });
        console.log(response.data);
        setLoginErrorMsg(response.data.message);
        setTimeout(()=>{
          setLoginErrorMsg("");
        },3000)
        setLoggedInUser({
          "_id":response.data.loggedInUser._id,
          "email":response.data.loggedInUser.email,
          "username":response.data.loggedInUser.username,
          "password":response.data.loggedInUser.password,
        })
        window.location = '/'
      }
      postLoginData(); 
    } catch (error) {
      console.log(error); 
    }
  }
  
  const getLoggedInUser = async ()=>{
    try {
      const response = await axios.get('http://localhost:5000/user/loggedIn',{
        withCredentials:true,
      });
      setLoggedInUser(response.data.loggedInUser);
    } catch (error) {
      console.log(error);
    }
  }

  const getAllTasks = async ()=>{
    try {
        const response = await axios.get('http://localhost:5000/tasks/getAll',{
        withCredentials:true,
      });
      setTasks(response.data.userTasks);
    } catch (error) {
      console.log(error);
    }
  }

  const getAllUpcomingTasks = async ()=>{
try {
      const response = await axios.get('http://localhost:5000/upcomingTasks/getAll',{withCredentials:true});
      console.log(response);
      setUpcomingTasks(response.data.data);
} catch (error) {
  console.log(error);
}
  }

  const getAllCompleted = async ()=>{
    try {
      const res = await axios.get('http://localhost:5000/tasks/getCompleted',{withCredentials:true});
      console.log(res); 
      setCompletedTasks(res.data.completedTasks);
    } catch (error) {
      console.log(error);
    }
  }

  const logout = async  ()=>{
    try {
      const response = await axios.get('http://localhost:5000/user/logout',{
        withCredentials:true,
      })
      console.log(response.data);
      setLoggedInUser(null);
      setTasks([]); 
      setUpcomingTasks([]); 
      setCompletedTasks([]);
    } catch (error) {
      console.log(error);
    }
  }

    useEffect(()=>{
      getAllTasks();
      getLoggedInUser();
      getAllUpcomingTasks();
      getAllCompleted();
    },[])

  // useEffect(()=>{
  //   localStorage.setItem('pendingTasks',JSON.stringify(tasks));
  //   localStorage.setItem('completedTasks',JSON.stringify(completedTasks));
  //   localStorage.setItem('upcomingTasks',JSON.stringify(upcomingTasks));
  // },[tasks,completedTasks,upcomingTasks])

  return (
    <>
    <ListContext.Provider value={{loggedInUser}}>
    <Router>
      <Routes>
        <Route path="/" element={<Layout noOfCompleted={completedTasks.length} logout={logout}/>}>
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
           loggedInUser={loggedInUser}
          />}/>
          <Route path="completed" element={<CompletedTasks
           completedTasks={completedTasks}
           clearCompleted={clearCompleted}
           loggedInUser={loggedInUser}
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
          isAddingPendingTask={isAddingPendingTask}
          setIsAddingPendingTask={setIsAddingPendingTask}
          loggedInUser={loggedInUser}
           />}/>
          <Route path="login" element={<Login loginUser={loginUser} handleLoginFormChange={handleLoginFormChange} loginFormData={loginFormData} loginErrorMsg={loginErrorMsg} />}/>
          <Route path="register" element={<Register registerErrorMsg={registerErrorMsg} registerUser={registerUser} registerFormData={registerFormData} handleRegisterFormChange={handleRegisterFormChange}/>} />
        </Route>
      </Routes>
    </Router>
    </ListContext.Provider>
    </>
  )
}

export default App
