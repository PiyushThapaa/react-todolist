import React, { useContext, useEffect, useState } from 'react'
import "../App.css"
import axios from 'axios';
import { context, server } from '../main';
import toast from 'react-hot-toast';
import TodoItem from '../components/TodoItem';
import { Navigate } from 'react-router-dom';

const Home = () => {

  const [title,settitle] = useState("");
  const [desc,setDesc] = useState("");
  const [todo,settodo] = useState([]);
  const [loading,setLoading] = useState(false);
  const [refresh, setRefresh] = useState(false)

  const {isAuthenticated} = useContext(context)

  useEffect(() => {
    axios.get(`${server}/task/my`,{
      withCredentials:true
    }).then(res=>{
      settodo(res.data.allTasks)
    }).catch(e=>console.log(e.response.data.message))
  }, [refresh])
  
  if (!isAuthenticated) return <Navigate to={"/login"} />

  const handleChangeTodo = (e) => {
    settitle(e.target.value);
  }
  const handleChangeDesc = (e) => {
    setDesc(e.target.value);
  }

  const handleClick = async (e)=>{
    setLoading(true)
    e.preventDefault();
    if(title === "" || desc === ""){
      alert("Please type proper To-do and description.")
    
    }else{
    try {
      const {data} = await axios.post(`${server}/task/new`,{
        title,description:desc
      },{
        withCredentials:true,
        headers:{
          "Content-Type":"application/json"
        }
      })
      setRefresh(!refresh)
      toast.success(data.message)
      setLoading(false)
    } catch (error) {
      toast.error(error.response.data.message)
    }
    settitle("")
    setDesc("")
    setLoading(false)
    }
  }
  function deleteHandler(id){
    try {
      axios.delete(`${server}/task/${id}`,{
        withCredentials:true
      }).then(res=>{
        setRefresh(!refresh)
        toast.success(res.data.message)
      })
    } catch (error) {
      toast.success(error.response.data.message)
    }
  }

  function updateHandler(id){
    try {
      axios.put(`${server}/task/${id}`,{},{
        withCredentials:true
      }).then(res=>{
        setRefresh(!refresh)
        toast.success("Action Updated")
      })
    } catch (error) {
      toast.success(error.response.data.message)
    }
  }
  return(
    <div className="container">
      <div  className='upper-part'>
      <form onSubmit = {handleClick} className='add-todo'>
      <input type="text" placeholder="Add Todo" onChange = {handleChangeTodo} value = {title} className = "inputs" />
          <input type="text" placeholder="Add Description" onChange = {handleChangeDesc} value = {desc} className = "inputs"/>
          <br/>
       <button type='submit' className = "buttons add-button" disabled={loading}>Add</button>
      </form>
      </div>
      { todo.length===0 ? <div className='no-todo-container'>No Todo Added...</div>
      :todo.map((todo,index) => {
      return(
        <TodoItem index={index} title={todo.title} description={todo.description} key={todo._id} updateHandle={updateHandler} deleteHandler={deleteHandler} id={todo._id} action={todo.action} />
      )
      })}
    </div>
  )
}

export default Home