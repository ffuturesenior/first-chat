import React, { useContext, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { AdminContext } from "..";
import { useSelector } from "react-redux";


const Header=()=>{
    const {isAdmin,setIsAmin}=useContext(AdminContext)
    const isAuth=useSelector(state=>state.user.isAuth)
    const id=localStorage.getItem('userID')
    return(
        <div>
            <div style={{background:"black",padding:"20px 10px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                <div>
                    <NavLink to='/'><p style={{fontSize:"20px",color:"white"}}>HOME</p></NavLink>
                </div>
                <div style={{display:'flex',justifyContent:"space-between"}}>
                    {isAdmin?
                      <NavLink to={`/admin`}><p style={{color:"white",margin:"0px 5px"}}>Admin</p></NavLink> 
                    :
                    <></>
                    }
                    {isAuth?
                        <NavLink to={`/userprofile/${id}`}><p style={{color:"white",margin:"0px 5px"}}>MyProfile</p></NavLink>
                    :
                        <></>
                    }
                    <NavLink to='/registration'><p style={{color:"white",margin:"0px 5px"}}>Registration</p></NavLink>
                    <NavLink to='/login'><p style={{color:"white",margin:"0px 5px"}}>Login</p></NavLink>
                </div>
            </div>
        </div>
    )

}

export default Header