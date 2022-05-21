import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getUserByName } from "../servFunctions/functions";

const UserSearch=()=>{
    const [name,setName]=useState("")
    const [autoComplete,setAutoComplete]=useState([])

    useEffect(()=>{
        if(name.length>=4&&name.length<=15){
            getUserByName(name,setAutoComplete)
        }
    },[name])


    return(
        <div style={{textAlign:"center"}}>
            userSearch<br/>
            <input style={{border:"2px solid blue",padding:"5px",borderRadius:"10px"}} value={name} onChange={(e)=>setName(e.target.value)}/>
            {name.length>=4?
                <div style={{textAlign:"center"}}>
                    {autoComplete.map(p=>
                        <div style={{borderBottom:" 1px solid black",margin:"4px auto",padding:"5px",maxWidth:"180px",textAlign:'center'}} key={p._id}>
                            <Link to={`userprofile/${p._id}`} style={{textAlign:"left"}}>
                               <p style={{cursor:"pointer",color:"black",fontSize:"20px"}}>{p.username}</p>  
                            </Link>
                        </div>    
                    )}
                    {autoComplete.length==0?
                        <div>cant find {name}</div>
                    :
                        <div></div>
                    }
                </div>
            :
                <div></div>
            }
        </div>
    )
}


export default UserSearch
