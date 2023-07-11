import React,{useState,useEffect} from 'react'
import { NavLink } from 'react-router-dom'
import dashboardIcon from "../assets/images/icons/dashboard.png";
import salesIcon from "../assets/images/icons/sales.png"
import purchaseIcon from "../assets/images/icons/purchase.png"
import collectionIcon from "../assets/images/icons/collection.png"
import '../scss/sidebar.scss'
import "../assets/fontawesome/css/fontawesome.min.css";
import "../assets/fontawesome/css/regular.min.css";
import "../assets/fontawesome/css/solid.min.css";
//import "../assets/fontawesome/css/v5-font-face.min.css"
import { Link } from 'react-scroll';

const AppSidebar = ({children}) => {
  const [isOpen, setIsOpen] = useState(true)
  const toggle=()=>{
    isOpen ? setIsOpen(false):setIsOpen(true);
    console.log(isOpen)
  }
  
  
 const menuItem =[
 
  {
    path:"salesdiv",
    name:"Sales",
    icon:<i className="fa-solid fa-arrow-up-from-bracket"></i>
  },
  {
    path:"purchasediv",
    name:"Purchase",
    icon:<i className="fa-solid fa-cart-shopping"></i>
  },
  {
    path:"collectiondiv",
    name:"Collection",
    icon:<i className="fa-solid fa-money-bills"></i>
  }

 ]
  return (
    <div className="container">
     <div className='sidebar' >
     <Link to="dashboard" spy={true} smooth={true}>
<NavLink to="/home/dashboard"   className="link" onClick={toggle}>
 
     <div className='icon'><i className="fa-solid fa-house"></i></div>
     <div className="link_text" >Dashboard</div>

 
</NavLink>  </Link>
      {
        menuItem.map(
          (item,index)=>{return(
<Link to={item.path} key={index} spy={true} smooth={true}  >
<NavLink to="/home/dashboard"   className="link" onClick={toggle}>
  <div className='icon'>{item.icon}</div>
  <div className="link_text" >{item.name}</div>
  </NavLink>
</Link>
        )}
        )
      }
     </div>
     <main>{children}</main>
    </div>
  )
}

export default AppSidebar;
