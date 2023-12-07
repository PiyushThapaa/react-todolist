import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Register from "./pages/Register";
import Login from "./pages/Login";
import toast, { Toaster } from "react-hot-toast";
import { useContext, useEffect } from "react";
import axios from "axios";
import { context, server } from "./main";

function App() {
  const {user,setUser,isAuthenticated,setIsAuthenticated,setLoading} = useContext(context)
  useEffect(() => {
    setLoading(true)
    axios.get(`${server}/users/me`,
    {
      withCredentials:true
    }).then(res=>{
      setUser(res.data.user)
      setIsAuthenticated(true)
      setLoading(false)
    }).catch((error)=>{
      console.log(error.response.data.message)
      setUser({});
    setIsAuthenticated(false)
    setLoading(false)
  })
  }, [isAuthenticated])

  
  return <Router>
    <Header/>
    <Routes>
      <Route path="/" element = {<Home/>}/>
      <Route path="/profile" element = {<Profile/>}/>
      <Route path="/login" element = {<Login />}/>
      <Route path="/signup" element = {<Register/>}/>
    </Routes>
    <Toaster/>
  </Router>
}
export default App
