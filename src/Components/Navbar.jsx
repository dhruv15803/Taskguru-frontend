import React, { useState } from 'react'
import { RxHamburgerMenu } from "react-icons/rx";
import { RxCross1 } from "react-icons/rx";

const Navbar = ({noOfCompleted}) => {
    const [showHamburger,setShowHamburger] = useState(false);
    const navLinks = ["completed tasks","upcoming tasks"];
    

  return (
    <>
    <nav className='flex items-center p-2 bg-orange-400 text-white'>
        <div className='text-white text-2xl'>
            TASKGURU
        </div>
        <div className='absolute right-4 text-2xl'>
            {showHamburger ? <button onClick={()=>setShowHamburger(false)}><RxCross1 /></button>: <button onClick={()=>setShowHamburger(true)}><RxHamburgerMenu/></button>}
        </div>
    </nav>
    {showHamburger && <div className='flex flex-col gap-2 mb-4'>
        {navLinks.map((item,i)=>{
            return <div key={i} className='p-2 border-b-2 text-orange-400'>
                {item==="completed tasks" ? `${item} (${noOfCompleted})`:item}
            </div>
        })}
        </div>}
    </>
  )
}

export default Navbar