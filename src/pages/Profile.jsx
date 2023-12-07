import React, { useContext } from 'react'
import {context} from "../main"
import Loader from '../components/Loader'
import { Navigate } from 'react-router-dom'

const Profile = () => {

  const {isAuthenticated,loading,user} = useContext(context)

  if (!isAuthenticated) return <Navigate to={"/"} />
  
  return (
    loading? <Loader/> :
    <div>
      <h1 style={{color:"red"}}>{user?.name}</h1>
      <p>{user?.email}</p>
    </div>
  )
}

export default Profile