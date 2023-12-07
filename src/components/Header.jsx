import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { context, server } from '../main'
import axios from 'axios'
import toast from 'react-hot-toast'
import "../styles/Header.css"

const Header = () => {
  const {isAuthenticated,setIsAuthenticated,loading,setLoading} = useContext(context)

  const logoutHandler = async () => {
    setLoading(true)
    try {
      await axios.get(`${server}/users/logout`,{
        withCredentials:true
      })
       toast.success("Logged out successfully")
       setIsAuthenticated(false)
       setLoading(false)
     } catch (error) {
       toast.error(error.response.data.message)
       setIsAuthenticated(true)
       setLoading(false)
       
     }
 }

  return (
    <nav className='header'>
        <h1>TodoList App</h1>
        <div>
            {isAuthenticated?
            <div className='nav-links'><Link to={"/"} className='link'>Home</Link>
            <Link to={"/profile"} className='link'>Profile</Link>
             <button onClick={logoutHandler} disabled={loading} className='log-out-in-btn link'>Logout</button></div>
            :<div className='nav-links'><Link to={"/login"} className='log-out-in-btn link'>Login</Link>
            <Link to={"/signup"} className='log-out-in-btn link'>Sign Up</Link></div> }
        </div>
    </nav>
  )
}

export default Header