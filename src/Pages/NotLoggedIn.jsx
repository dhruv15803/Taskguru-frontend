import React from 'react'
import { Link } from 'react-router-dom'

const NotLoggedIn = () => {
  return (
    <>
    <div className='border-2 rounded-lg shadow-lg p-4 flex justify-center my-28 mx-12 flex-col items-center gap-4'>
        <h1 className='text-2xl font-bold'>Please login to manage your tasks</h1>
        <Link to='/login'><p className='text-orange-400 text-xl'>Click here to login</p></Link>
    </div>
    </>
  )
}

export default NotLoggedIn