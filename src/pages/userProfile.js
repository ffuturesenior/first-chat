import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import Loader from "../components/loader";
import { createP2PChat, getP2PChat, getUser, getUserAvatar, redactUser } from "../servFunctions/functions";


const UserProfile=()=>{
    const router=useHistory()
    const {id}=useParams()
    const [userData,setUserData]=useState({
        username:"",
        avatar:""
    })
    const [isLoading,setIsLoading]=useState(false)
    const [isErr,setIsErr]=useState(true)
    const [isOwnProfile,setIsOwnProfile]=useState(false)
    const [redactToggle,setReactToggle]=useState(false)
    const [redactData,setRedactData]=useState({
        username:`${userData.username}`,
        avatar:``
    })
    const [userAvatar,setUserAvatar]=useState({
        avatar:`${userData.avatar}`
    })
    const [p2pChatId,setP2PChatId]=useState('')
    useEffect(()=>{
        setIsLoading(true)
        getUser(id,setUserData,setIsErr,setRedactData)
        getP2PChat(localStorage.getItem('userID'),id,setP2PChatId,setIsErr)
       // console.log(p2pChatId)
        if(id==localStorage.getItem('userID')){
            setIsOwnProfile(true)
        }
        setTimeout(()=>{setIsLoading(false)},[2000])
    },[])

    
    const formData=new FormData()

    const fileHandler=(e)=>{
        const avatar=e.target.files[0]
        formData.append('avatar',avatar)
    }

    const redactProfile=()=>{
        formData.append("username",redactData.username)
        formData.append('caption',redactData.caption)
        console.log(redactData.avatar)
        if(redactData.username.length>=4){
            redactUser(id,formData)
            //formData.delete("username")
            //formData.delete('caption')
            //formData.delete('avatar')
            getUser(id,setUserData,setIsErr,setRedactData)
        }else{
            alert('short nickname')
        }
        
    }


    
    const toChat=()=>{
        setIsLoading(true)
        getP2PChat(localStorage.getItem('userID'),id,setP2PChatId,setIsErr)
        if(p2pChatId.length>=1){
            router.push(`/p2pchat/${p2pChatId[0]._id}&${id}`)
        }
        if(p2pChatId.length==0){
            setIsLoading(true)
            createP2PChat(localStorage.getItem('userID'),id)
            setTimeout(()=>{
                getP2PChat(localStorage.getItem('userID'),id,setP2PChatId,setIsErr)
                setTimeout(()=>{
                    router.push(`/p2pchat/${p2pChatId[0]._id}&${id}`)
                },[2000])
                setIsLoading(false)
            },[2000])
           // getP2PChat(localStorage.getItem('userID'),id,setP2PChatId,setIsErr).then(console.log(p2pChatId[0]._id))
            //setIsLoading(false)
           // router.push(`/p2pchat/${p2pChatId[0]._id}&${id}`)
        }
    }
    



    return(
        <div style={{overflow:'hidden',padding:"10px"}} >
            {isLoading?
                <><Loader/></>
            :
                <>
                    {isErr?
                        <div>err
                            <button style={{border:"1px solid black",borderRadius:"5px",padding:"5px"}} onClick={()=>{router.goBack()}}>back</button>
                        </div>
                        
                    :
                        <div style={{maxWidth:"1000px",margin:'0px auto'}}>
                            <div style={{display:"flex",justifyContent:"space-between"}}>
                                <strong style={{fontSize:"25px"}}>{userData.username}</strong>
                                <button style={{border:"1px solid black",borderRadius:"5px",padding:"5px"}} onClick={()=>{router.goBack()}}>back</button>
                            </div>
                            {userData.avatar?
                                <div style={{border:"1px solid black",borderRadius:"45px",overflow:"hidden",width:"100px",height:"100px"}}><img style={{objectFit:"cover"}} src={`https://chat-db-sync.herokuapp.com/${userData.avatar}`}/></div>
                            :
                                <div><div style={{border:"1px solid black",borderRadius:"45px",overflow:"hidden",width:"100px",height:"100px"}}><p style={{position:"relative",textAlign:"center",top:"45%"}}>no avatar</p></div></div>

                            }
                        

                            <br/>
                            <br/>
                            <p style={{fontSize:"20px"}}>{userData.caption}</p>
                            {isOwnProfile?
                                <div>
                                    <button style={{border:"1px solid black",borderRadius:"5px",padding:"5px"}} onClick={(e)=>{redactToggle?setReactToggle(false):setReactToggle(true)}}> redact profile</button>
                                    {redactToggle?
                                        <div>
                                            <input style={{border:"1px solid black"}} value={redactData.username} onChange={(e)=>{setRedactData({...redactData,username:e.target.value})}}/>
                                            <input style={{border:"1px solid black"}} type="file"  onChange={fileHandler}/>
                                            <button style={{border:"1px solid black",borderRadius:"5px",padding:"5px"}} onClick={redactProfile}> put</button>
                                        </div>
                                    :
                                        <div></div>
                                    }

                                </div>
                            :
                                <div>
                                    <button style={{border:"1px solid black",borderRadius:"5px",padding:"5px"}} onClick={toChat}>to chat</button>
                                </div>
                            }
                        </div>
                    }  
                </>
            }
            
        </div>
    )
}

export default UserProfile