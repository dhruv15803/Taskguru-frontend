import React, { useState } from 'react'
import UpcomingPendingTask from '../Components/UpcomingPendingTask'

const UpcomingTasks = ({
    upcomingFormData,
    handleUpcomingChange,
    upcomingAddTask,
    upcomingEmptyTaskErrorMsg,
    upcomingTasks,
    upcomingInputRef,
    clearUpcomingTasks,
    editUpcomingTask,
    deleteUpcomingTask,
    completeUpcomingTask,
    isUpcomingEdit,
    setUpcomingTasks
    }) => {

      const [isAddingPendingTask,setIsAddingPendingTask] = useState(false);
      const [overDueFilter,setOverDueFilter] = useState(false);


  return (
    <>
    <div className='m-4 p-2 text-2xl font-semibold'>
        Plan your upcoming tasks
    </div>
    {upcomingTasks.length!==0 && <div className='flex gap-2'>
      <button onClick={()=>setOverDueFilter(false)} className={`border-2 rounded-lg p-2 text-orange-400 border-orange-400 ${overDueFilter===false ? "bg-orange-400 text-white":""} `}>All</button>
      <button onClick={()=>setOverDueFilter(true)} className={`border-2 rounded-lg p-2 text-orange-400 border-orange-400 ${overDueFilter ? "bg-orange-400 text-white":""}`}>Overdue</button>
    </div>}
    <p>{upcomingEmptyTaskErrorMsg}</p>
    {overDueFilter ? <>{upcomingTasks?.filter(task => task.overdue===true).map((item,i)=>{
      return <UpcomingPendingTask 
      key={i}
       deleteUpcomingTask={deleteUpcomingTask}
       editUpcomingTask={editUpcomingTask}
       completeUpcomingTask={completeUpcomingTask} 
      id={item.id}
       title={item.title}
       description={item.description} 
      dueDate={item.dueDate}
      overdue={item.overdue}
      upcomingTasks={upcomingTasks}
      setUpcomingTasks={setUpcomingTasks}
      />
    })}</> : <>
     {upcomingTasks?.map((item,i)=>{
      return <UpcomingPendingTask 
      key={i}
       deleteUpcomingTask={deleteUpcomingTask}
       editUpcomingTask={editUpcomingTask}
       completeUpcomingTask={completeUpcomingTask} 
      id={item.id}
      title={item.title}
      description={item.description} 
      dueDate={item.dueDate}
      overdue={item.overdue}
      upcomingTasks={upcomingTasks}
      setUpcomingTasks={setUpcomingTasks}
      />
    })}    
    </>}


    {(upcomingTasks.length!==0 && overDueFilter===false)  && <div className=' flex justify-center'>
      <button onClick={clearUpcomingTasks} className='border-2 rounded-lg text-orange-400 p-2 border-orange-400 hover:bg-orange-400 hover:text-white hover:duration-300 my-2'>Clear tasks</button>
    </div>}
    <div className='mx-8 text-orange-400 font-bold my-4'>
      <button onClick={()=>setIsAddingPendingTask(!isAddingPendingTask)} >{isAddingPendingTask ? "cancel" : "Add upcoming task"}</button>
    </div>
    {isAddingPendingTask && <form onSubmit={upcomingAddTask} className='m-4 p-2  rounded-lg shadow-lg flex flex-col gap-2' >
        <input  ref={upcomingInputRef} className='p-2 border-2 rounded-lg' value={upcomingFormData.title} onChange={handleUpcomingChange} type="text" name="title" id="" placeholder='Enter task' />
        <input className='p-2 border-2 rounded-lg' value={upcomingFormData.description} onChange={handleUpcomingChange} type="text" name="description" id="" placeholder='Enter description'/>
        <input className='p-2 border-2 rounded-lg' value={upcomingFormData.dueDate} onChange={handleUpcomingChange} type="datetime-local" name="dueDate" id="" />
        <button>{isUpcomingEdit ? "edit":"Add task"}</button>
    </form>}
    </>
  )
}

export default UpcomingTasks