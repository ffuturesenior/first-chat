import axios from 'axios'
import React,{useCallback, useContext, useEffect, useState} from "react";
import { login } from "../servFunctions/functions";
import {useDispatch} from 'react-redux'
import { logout } from "../redux/userReducer";
import { AdminContext } from "..";
import { useSelector } from "react-redux";
import { isMobile } from 'react-device-detect'
import { setUser } from '../redux/userReducer'

const Login=()=>{
    const site_url=`https://chat-db-sync.herokuapp.com/chathuyat`
    const {isAdmin,setIsAdmin}=useContext(AdminContext)
    const isAuth=useSelector(state=>state.user.isAuth)
    const [secondReqToggle,setSecondReqToggle]=useState(false)
    const [isLoading,setIsLoading]=useState(true)
    const [userFormData,setUserFormData]=useState({
        username:"",
        email:"",
        password:"",
        
    })
    const dispatch=useDispatch()
    const unlog=()=>{
        dispatch(logout())
        setIsAdmin(false)
        localStorage.removeItem('userID')
    }
    async function firstReq(userData,email,setIsAdmin){
        try{
            if(!userData.email||!userData.username||!userData.password){
                return res.status(400).alert("bad request")
            }
            const res= await axios.post(`${site_url}/users/login`,{
                username:userData.username,
                email:email,
                pswd:userData.password,
                admin:false,
                caption:" ",
                avatar:" "
            })
            dispatch(setUser(res.data.user))
            localStorage.setItem('userID',res.data.user.id)
            setIsAdmin(res.data.user.admin)
            console.log(res.data)
            alert("logined")
        }catch(e){
            alert(e.response.data.message)
        }    
    }

    const login1=(e)=>{
        setIsLoading(true)
        e.preventDefault()
        firstReq(userFormData,`${userFormData.email}`,setIsAdmin)
        //dispatch(login(userFormData,setIsAdmin))
        setSecondReqToggle(true)
    }

    useEffect(()=>{
        if(secondReqToggle==true){
            dispatch(login(userFormData,setIsAdmin))
            setSecondReqToggle(false)
            setIsLoading(false)
        }
    },[secondReqToggle])


    return(
        <div style={{textAlign:"center"}}>
            login
            <div style={{textAlign:"center"}}>
                <form netlify>
                <input style={{display:"inline-block",border:"2px solid blue",borderRadius:"20px",padding:"15px",margin:"5px 0px"}}  type="text" value={userFormData.username} onChange={(e)=>{setUserFormData({...userFormData,username:e.target.value})}} placeholder="username"/><br/>
                <input style={{display:"inline-block",border:"2px solid blue",borderRadius:"20px",padding:"15px",margin:"5px 0px"}}  type="text"  value={userFormData.email} onChange={(e)=>{setUserFormData({...userFormData,email:e.target.value})}} placeholder="email"/><br/>
                <input style={{display:"inline-block",border:"2px solid blue",borderRadius:"20px",padding:"15px",margin:"5px 0px"}}  type="password"  value={userFormData.password} onChange={(e)=>{setUserFormData({...userFormData,password:e.target.value})}} placeholder="password"/><br/>
                <button style={{display:"inline-block",border:"1px solid black",borderRadius:"10px",padding:"5px",margin:"5px 0px"}} onClick={login1}>submit</button><br/>
                </form>               
                {isAuth?
                    <><button style={{display:"inline-block",border:"1px solid black",borderRadius:"10px",padding:"5px",margin:"5px 0px"}} onClick={unlog}>log out</button><br/></>
                :
                    <></>
                }
                {isMobile?<>mobile</>:<>non mobile</>}
            </div>
        </div>
    )
}

export default Login