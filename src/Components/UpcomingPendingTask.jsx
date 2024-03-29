import React, { useEffect, useState } from 'react'
import { IoChevronDown } from 'react-icons/io5';
import { IoChevronUp } from 'react-icons/io5';
import { FaTrash } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import { FaCheck } from "react-icons/fa6";

const UpcomingPendingTask = ({id,title,description,dueDate,deleteUpcomingTask,editUpcomingTask,completeUpcomingTask,overdue,upcomingTasks,setUpcomingTasks}) => {
    const [isShowDescription,setIsShowDescription] = useState(false);

    useEffect(()=>{
      let currDate = new Date();
      let isOverdue = overdue;
      const specificDate = new Date(dueDate);
      console.log(specificDate < currDate);
      if(specificDate < currDate){
        isOverdue = true;
      }
      else{
        isOverdue = false;
      }
      const newUpcomingTasks = upcomingTasks.map((item,i)=>{
        if(item.id===id){
          return {
            ...item,
            "overdue":isOverdue,
          }
        }
        else{
          return item;
        }
      })
      setUpcomingTasks(newUpcomingTasks);
    },[]);
    

    return (
      <>
      <div className='flex flex-col gap-2 my-2 p-4 rounded-lg shadow-lg mx-8'>
        <div className='flex  text-xl font-bold items-center'>
          <div className='flex flex-wrap w-[90%]'>
            {title}
          </div>
          {description && <div className='text-2xl'>
            {isShowDescription ? <IoChevronUp onClick={()=>setIsShowDescription(false)}/> : <IoChevronDown onClick={()=>setIsShowDescription(true)}/>}
          </div>}
        </div>
        {isShowDescription && <div className='flex flex-wrap text-md font-semibold'>
           {description}
          </div>}
        <div className='flex flex-wrap gap-2'>
            <p>Due date</p>
            <p>{dueDate}</p>
            {overdue ? <p className='text-red-500'>overdue</p>:null}
        </div>
        <div className='flex gap-10 justify-center my-2'>
          <button onClick={()=>completeUpcomingTask(id)} className='text-xl'><FaCheck/></button>
          <button onClick={()=>deleteUpcomingTask(id)} className='text-xl'><FaTrash/></button>
          {overdue===false && <button onClick={()=>editUpcomingTask(id)} className='text-xl'><FaEdit/></button>}
        </div>
      </div>
      </>
    )
}

export default UpcomingPendingTask