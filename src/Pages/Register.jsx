import React from 'react'
import { Link } from 'react-router-dom'

const Register = ({registerUser,registerFormData,handleRegisterFormChange,registerErrorMsg}) => {
  return (
    <>
    <div className='mx-4 text-orange-400 font-bold text-2xl my-8'>
        Register
    </div>
    <form onSubmit={registerUser} className='flex flex-col gap-2 border-2 rounded-lg shadow-lg mx-4 my-12 p-4'>
        <input value={registerFormData.username} onChange={handleRegisterFormChange} className='p-2 border-2 mx-4 rounded-lg' type="text" name="username" id="username" placeholder='Enter username'/>
        <input value={registerFormData.email} onChange={handleRegisterFormChange} className='p-2 border-2 mx-4 rounded-lg' type="text" name="email" id="email" placeholder='Enter email'/>
        <input value={registerFormData.password} onChange={handleRegisterFormChange} className='p-2 border-2 mx-4 rounded-lg' type="password" name="password" id="password" placeholder='Enter password'/>
        <button className=' w-1/2 mx-auto my-4 border-2 rounded-lg p-2 text-orange-400 border-orange-400 hover:text-white hover:bg-orange-400 hover:duration-300'>Register</button>
        <div className='flex justify-center'>
          <Link to='/login'><p className='text-orange-400 text-lg'>Click here if you already have an account</p></Link>
        </div>
    </form>
    <div className='flex justify-center my-2 text-orange-400 text-xl'>
        {registerErrorMsg}
    </div>
    </>
  )
}

export default Register