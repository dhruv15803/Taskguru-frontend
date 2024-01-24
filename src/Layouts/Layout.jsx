import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../Components/Navbar'

const Layout = ({noOfCompleted,logout}) => {
  return (
    <>
    <Navbar noOfCompleted={noOfCompleted} logout={logout} />
    <Outlet/>
    </>
  )
}

export default Layout