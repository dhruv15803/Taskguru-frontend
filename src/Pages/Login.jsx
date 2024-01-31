import React from 'react'
import { Link } from 'react-router-dom'

const Login = ({loginUser,loginFormData,handleLoginFormChange,loginErrorMsg}) => {
  return (
    <>
        <div className='mx-4 text-orange-400 font-bold text-2xl my-8'>
            Login
    </div>
    <form onSubmit={loginUser} className='flex flex-col gap-2 border-2 rounded-lg shadow-lg mx-4 my-12 p-4'>
        <input value={loginFormData.email} onChange={handleLoginFormChange} className='p-2 border-2 mx-4 rounded-lg' type="text" name="email" id="email" placeholder='Enter email'/>
        <input value={loginFormData.password} onChange={handleLoginFormChange} className='p-2 border-2 mx-4 rounded-lg' type="password" name="password" id="password" placeholder='Enter password'/>
        <button className=' w-1/2 mx-auto my-4 border-2 rounded-lg p-2 text-orange-400 border-orange-400 hover:text-white hover:bg-orange-400 hover:duration-300'>Login</button>
        <div className='flex justify-center'>
          <Link to='/register'><p className='text-orange-400 text-lg'>Click here to register</p></Link>
        </div>
    </form>
    {<div className='flex justify-center my-4 text-orange-400 font-bold'>{loginErrorMsg}</div>}
    </>
  )
}

export default Login