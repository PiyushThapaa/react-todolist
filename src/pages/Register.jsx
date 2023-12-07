import React, { useContext, useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import axios from 'axios'
import { context, server } from '../main'
import toast from 'react-hot-toast'
import "../styles/login-signup.css"

const Register = () => {
    const [name,setName] = useState("")
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const {isAuthenticated,setIsAuthenticated,loading,setLoading} = useContext(context)

    const submitHandler = async (e) => {
      setLoading(true)
      e.preventDefault();
        try {
         const { data } = await axios.post(`${server}/users/new`,
         {name,email,password},{
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
            <input type="text" name="name" id="name" placeholder='Name' value={name} onChange={(e)=>setName(e.target.value)} required/>
            <input type="email" name="email" id="email" placeholder='Email' value={email} onChange={(e)=>setEmail(e.target.value)} required/>
            <input type="password" name="password" id="password" placeholder='Password' value={password} onChange={(e)=>setPassword(e.target.value)} required/>
            <button type='submit' disabled={loading} className='btn'>Sign Up</button>
            <p>Already have an account?</p>
            <Link to={"/login"} className='auth-link'>Login</Link>
        </form>
    </div>
  )
}

export default Register