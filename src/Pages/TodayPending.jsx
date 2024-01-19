import React, { useState } from 'react'
import { RxPencil2 } from "react-icons/rx";
import { ImCross } from "react-icons/im";
import PendingTask from './PendingTask';

const TodayPending = ({
    tasks,
    formData,
    handleChange,
    addTask,
    isTasks,
    setisTasks,
    deleteTask,
    emptyTaskErrorMsg,
    editTask,
    isEdit,
    completeTask
    }) => {

  return (
    <>
    <div className='flex gap-2 items-center mx-8 mt-12'>
        <button onClick={()=>setisTasks(!isTasks)} className='text-orange-500 text-3xl rounded-full hover:bg-orange-500 hover:text-white hover:duration-300'>{isTasks ? <ImCross/> : "+"}</button>
        {isTasks ? <p className='text-orange-400'>Cancel task</p> :<p className='text-orange-400'>Add task</p>}
    </div>
    {isTasks ? <><form onSubmit={addTask} className='border-2 rounded-lg shadow-lg flex flex-col m-8 mt-24 p-4 gap-2'>
        <input value={formData.title} onChange={handleChange} className='border-b-2 p-2' type="text" name="title" id="" placeholder='Enter task'/>
        <input value={formData.description} onChange={handleChange} className='border-b-2 p-2' type="text" name="description" id="" placeholder='Enter description'/>
        <button className='border-2 rounded-lg text-orange-500 border-orange-400 p-2 hover:bg-orange-400 hover:text-white hover:duration-300'>{isEdit ? "edit task" : "Add task"}</button>
    </form> <div className='my-2 flex justify-center text-xl'>
        {emptyTaskErrorMsg}
        </div> </>:
    <>
    {tasks.length!==0 ? <div>
        {tasks.map((item,i)=>{
            return <PendingTask completeTask={completeTask} editTask={editTask} deleteTask={deleteTask} key={item.id} id={item.id} title={item.title} description={item.description} />
        })}        
        </div> :  <div className='border-2 rounded-lg shadow-lg flex flex-col items-center justify-center m-8 my-36 px-4 py-8'>
        <div className='text-8xl text-orange-300'>
            <RxPencil2/>
        </div>
        <div className='text-orange-500 flex flex-col items-center'>
            <p className='text-xl font-bold'>You have no tasks for today</p>
            <p className='text-center text-md'>Check the upcoming tasks section for your upcoming tasks!</p>
        </div>
    </div>  }
    </>
    }
    </>
  )
}

export default TodayPending