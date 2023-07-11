import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import "../assets/fontawesome/css/fontawesome.min.css";
import "../assets/fontawesome/css/solid.min.css";
import '../scss/navbar.scss'

const AppHeader = () => {
  const navigate =useNavigate();
  let handleLogout=()=>{
    localStorage.removeItem("username");
    localStorage.removeItem("token")
    navigate("/login");
  }
  let username = localStorage.getItem('username')
  return (
    <div className="navbar">
     <div className="header">
      <div className='header-icon'>

      </div>
      <div className='header-name' style={{fontFamily :"sen"}}>
       myRetail
      </div>
     </div>
     <div className="navbar-items">
     
      <div className="nav-item">
      <i className="fa-solid fa-user"></i>  
      </div>
      <div className='nav-item'>
      {username}
      </div>
      <div style={{display:"flex",marginRight:"1rem",alignItems:"center"}}>
      <button className="logoutbtn" onClick={handleLogout}>Logout</button>
      </div>
     </div>
    </div>
  )
}

export default AppHeader
