import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../Components/Navbar'

const Layout = ({noOfCompleted}) => {
  return (
    <>
    <Navbar noOfCompleted={noOfCompleted} />
    <Outlet/>
    </>
  )
}

export default Layout