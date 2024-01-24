import React from 'react'

const Login = ({loginUser,loginFormData,handleLoginFormChange}) => {
  return (
    <>
        <div className='mx-4 text-orange-400 font-bold text-2xl my-8'>
            Login
    </div>
    <form onSubmit={loginUser} className='flex flex-col gap-2 border-2 rounded-lg shadow-lg mx-4 my-12 p-4'>
        <input value={loginFormData.email} onChange={handleLoginFormChange} className='p-2 border-2 mx-4 rounded-lg' type="text" name="email" id="email" placeholder='Enter email'/>
        <input value={loginFormData.password} onChange={handleLoginFormChange} className='p-2 border-2 mx-4 rounded-lg' type="password" name="password" id="password" placeholder='Enter password'/>
        <button className='border-2 rounded-lg p-2 text-orange-400 border-orange-400 hover:text-white hover:bg-orange-400 hover:duration-300'>Login</button>
    </form>
    </>
  )
}

export default Login