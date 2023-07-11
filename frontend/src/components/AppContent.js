import React from 'react'
import { Navigate, Outlet, Route, Routes } from 'react-router-dom'
import Dashboard from 'src/components/Dashboard'
import routes from '../routes'
import "../scss/dashboard.scss";

// routes config
const AppContent = () => {
  return (
    <div className="dashboard">
    <Outlet></Outlet>
   </div>
  )
}

export default React.memo(AppContent)
