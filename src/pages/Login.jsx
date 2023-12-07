import React, { useContext, useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { context, server } from '../main';
import axios from 'axios';
import toast from 'react-hot-toast';
import "../styles/login-signup.css"

const login = () => {
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  const {isAuthenticated,setIsAuthenticated,loading,setLoading} = useContext(context)


  const submitHandler = async (e) => {
    setLoading(true)
    e.preventDefault();
        try {
         const { data } = await axios.post(`${server}/users/login`,
         {email,password},{
           headers:{
             "Content-Type":"application/json"
           },
           withCredentials:true
         })
          toast.success(data.message)
          setIsAuthenticated(true)
          setLoading(false)
        } catch (error) {
          toast.error(error.response.data.message)
          setIsAuthenticated(false)
          setLoading(false)
        }
    }
    if(isAuthenticated) return <Navigate to={"/"}/>
  return (
    <div>
        <form onSubmit={submitHandler}>
            <input type="email" name="email" id="email" placeholder='Email' value={email} onChange={(e)=>setEmail(e.target.value)} required/>
            <input type="password" name="password" id="password" placeholder='Password' value={password} onChange={(e)=>setPassword(e.target.value)} required/>
            <button type='submit' disabled = {loading} className='btn'>Login</button>
            <p>Have not Registered yet?</p>
            <Link to={"/signup"} className='auth-link'>Sign Up</Link>
        </form>
    </div>
  )
}

export default login