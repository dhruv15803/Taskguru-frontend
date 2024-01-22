import React, { useState } from 'react'
import { IoChevronDown } from "react-icons/io5";
import { IoChevronUp } from 'react-icons/io5';


const CompletedTask = ({title,description,id,dueDate,overdue}) => {

    const [isShowDescription,setIsShowDescription] = useState(false);


  return (
    <>
    <div className='flex flex-col p-4 rounded-lg shadow-xl'>
        <div className='flex items-center'>
            <div className='flex flex-wrap w-[90%] font-bold gap-2'>
                <p>{title}</p>
                {overdue ? <p className='text-red-500'>Completed overdue</p>:null}
            </div>
            {description && <div>
                {isShowDescription ? <IoChevronUp onClick={()=>setIsShowDescription(false)}/> : <IoChevronDown onClick={()=>setIsShowDescription(true)}/>}
            </div>}
        </div>
        {isShowDescription && <div className='flex flex-wrap'>
            {description}
            </div>}
        {dueDate!==undefined && <div>
            {dueDate}
        </div>}
    </div>
    </>
  )
}

export default CompletedTask