import React, { useContext, useState } from 'react'
import { RxHamburgerMenu } from "react-icons/rx";
import { RxCross1 } from "react-icons/rx";
import {NavLink,Link } from 'react-router-dom';
import { ListContext } from '../App';



const Navbar = ({noOfCompleted,logout}) => {
    const [showHamburger,setShowHamburger] = useState(false);
    const {loggedInUser} = useContext(ListContext);

    console.log(loggedInUser,"navbar");

    return (
    <>
    <nav className='flex items-center p-2 bg-orange-400 text-white'>
        <div className='text-white text-2xl'>
            <Link onClick={()=>setShowHamburger(false)} to='/'>TASKGURU</Link>
        </div>
        {loggedInUser!==null && <p className='mx-4'>{loggedInUser.username}</p>}
        <div className='absolute right-4 text-2xl'>
            {showHamburger ? <button onClick={()=>setShowHamburger(false)}><RxCross1 /></button>: <button onClick={()=>setShowHamburger(true)}><RxHamburgerMenu/></button>}
        </div>
    </nav>
    {showHamburger && <div className='flex flex-col gap-2 mb-4 bg-orange-400'>
        <ul className='flex flex-col gap-2 p-2'>
            <NavLink onClick={()=>setShowHamburger(false)} className={({isActive}) => isActive ? 'text-white text-lg underline-offset-8 underline':'text-white text-lg'} to='/completed'><li>Completed tasks ({noOfCompleted})</li></NavLink>
            <NavLink onClick={()=>setShowHamburger(false)} className={({isActive}) => isActive ? 'text-white text-lg underline-offset-8 underline':'text-white  text-lg'}  to='/upcoming'><li>Upcoming tasks</li></NavLink>
            {loggedInUser!==null ? <li><button onClick={logout} className='text-white text-lg'>Logout</button></li> : 
            <NavLink onClick={()=>setShowHamburger(false)} className={({isActive}) => isActive ? 'text-white text-lg underline-offset-8 underline':'text-white text-lg'} to='/login'>Login</NavLink>
            }
            {loggedInUser===null && <NavLink onClick={()=>setShowHamburger(false)} className={({isActive}) => isActive ? 'text-white text-lg underline-offset-8 underline':'text-white text-lg'} to='/register'>Register</NavLink>}
        </ul>
        </div>}
    </>
  )
}

export default Navbar