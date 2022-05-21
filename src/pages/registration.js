import React, { useState } from "react";
import { registrate } from "../servFunctions/functions";


const Registration=()=>{
    const [userFormData,setUserFormData]=useState({
        username:"",
        email:"",
        password:""
    })

    const reg=(e)=>{
        e.preventDefault()
        registrate(e,userFormData)
    }


    return(
        <div style={{textAlign:"center"}}>
            Registration

            <div>
                <form>
                    <input style={{display:"inline-block",border:"2px solid blue",borderRadius:"10px",padding:"5px",margin:"5px 0px"}}  type="text" value={userFormData.username} onChange={(e)=>{setUserFormData({...userFormData,username:e.target.value})}} placeholder="username"/><br/>
                    <input style={{display:"inline-block",border:"2px solid blue",borderRadius:"10px",padding:"5px",margin:"5px 0px"}}  type="text"  value={userFormData.email} onChange={(e)=>{setUserFormData({...userFormData,email:e.target.value})}} placeholder="email"/><br/>
                    <input style={{display:"inline-block",border:"2px solid blue",borderRadius:"10px",padding:"5px",margin:"5px 0px"}}  type="password"  value={userFormData.password} onChange={(e)=>{setUserFormData({...userFormData,password:e.target.value})}} placeholder="password"/><br/>
                    <button onClick={reg}>submit</button>
                </form>
            </div>
        </div>
    )
}

export default Registration