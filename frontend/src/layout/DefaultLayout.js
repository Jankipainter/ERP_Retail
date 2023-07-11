import React from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContent, AppSidebar, AppFooter, AppHeader } from '../components/index'



const DefaultLayout = () => {
  const navigate =useNavigate()
  useEffect(() => {
    if(!localStorage.getItem('token')){
        navigate('/login')
    }
  }, [])
  return (
    <div>
      <AppHeader />
     <div className='main-content'>
     <AppSidebar />
        <AppContent />
     </div>
      
        
        <AppFooter />
      
    </div>
  )
}

export default DefaultLayout
