import React, { Component} from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import  './App.css'
import { config } from '@fortawesome/fontawesome-svg-core'
config.autoAddCss = false

import '@fortawesome/fontawesome-svg-core/styles.css'
import "./assets/font/Sen-ExtraBold.ttf"
import "./assets/font/Rubik-VariableFont_wght.ttf"
import Login from './components/Login'
import routes from"./routes"
const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

// Containers
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))

// Pages
// const Login = React.lazy(() => import('./views/pages.js/login/Login'))
// const Register = React.lazy(() => import('./views/pages.js/register/Register'))
// const Page404 = React.lazy(() => import('./views/pages.js/page404/Page404'))
// const Page500 = React.lazy(() => import('./views/pages.js/page500/Page500'))

class App extends Component {
  render() {
    return (
      <BrowserRouter>
      
          <Routes>
            {/* <Route exact path="/login" name="Login Page" element={<Login />} />
            <Route exact path="/register" name="Register Page" element={<Register />} />
            <Route exact path="/404" name="Page 404" element={<Page404 />} />
            <Route exact path="/500" name="Page 500" element={<Page500 />} /> */}
            <Route exact path="login" name="login page" element={<Login />}/>
            <Route exact path="home"  element={<DefaultLayout />} >
            {routes.map((route, idx) => {
      return (
        route.element && (
          <Route
            key={idx}
            path={route.path} 
            element={<route.element />}
          />
        )
      )
    })}
              </Route>
          </Routes>
        
      </BrowserRouter>
    )
  }
}

export default App
