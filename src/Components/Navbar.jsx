import React, { useState } from 'react'
import { RxHamburgerMenu } from "react-icons/rx";
import { RxCross1 } from "react-icons/rx";
import {NavLink,Link } from 'react-router-dom';



const Navbar = ({noOfCompleted}) => {
    const [showHamburger,setShowHamburger] = useState(false);

  return (
    <>
    <nav className='flex items-center p-2 bg-orange-400 text-white'>
        <div className='text-white text-2xl'>
            <Link to='/'>TASKGURU</Link>
        </div>
        <div className='absolute right-4 text-2xl'>
            {showHamburger ? <button onClick={()=>setShowHamburger(false)}><RxCross1 /></button>: <button onClick={()=>setShowHamburger(true)}><RxHamburgerMenu/></button>}
        </div>
    </nav>
    {showHamburger && <div className='flex flex-col gap-2 mb-4'>
        <ul className='flex flex-col border-2 gap-2 p-2'>
            <NavLink className={({isActive}) => isActive ? 'text-orange-400 text-lg underline-offset-8 underline':'text-orange-400 text-lg'} to='/completed'><li>Completed tasks ({noOfCompleted})</li></NavLink>
            <NavLink className={({isActive}) => isActive ? 'text-orange-400 text-lg underline-offset-8 underline':'text-orange-400 text-lg'}  to='/upcoming'><li>Upcoming tasks</li></NavLink>
        </ul>
        </div>}
    </>
  )
}

export default Navbar