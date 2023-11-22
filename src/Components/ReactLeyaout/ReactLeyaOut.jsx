import React from 'react'
import SideBar from '../Leyaout/HomePage/SideBar'
import { Outlet } from 'react-router-dom'

function ReactLeyaOut() {
  return (
    <div>
      <SideBar/>
      <Outlet/>
    </div>
  )
}

export default ReactLeyaOut
