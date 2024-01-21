import React from 'react'
import CompletedTask from '../Components/CompletedTask';
import { Link } from 'react-router-dom';

const CompletedTasks = ({completedTasks,clearCompleted}) => {
  return (
    <>
     <div className='flex flex-col  m-4 p-2'>
        <h1 className='text-2xl font-bold'>Completed tasks</h1>
        {completedTasks.length===0 && <div className='text-orange-400 text-lg'>
            You have no completed tasks. <Link className='font-bold' to='/'>Click here</Link>
            </div>}
        {completedTasks.length!==0 && <> <div className='flex flex-col my-2'>
            {completedTasks.map((item,i)=>{
                return <CompletedTask key={i} title={item.title} description={item.description} id={item.id} dueDate={item.dueDate}/>
            })}
        </div>
        <div className='flex justify-center'>
        <button onClick={clearCompleted} className='text-orange-400 p-2 my-2 border-2 rounded-lg border-orange-400 hover:bg-orange-400 hover:text-white hover:duration-300'>Clear completed</button>
        </div></>}
    </div>
    </>
  )
}

export default CompletedTasks;