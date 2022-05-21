import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { deleteMessage, getMessageByChatID, getMessageByID, getUser, redactMessage } from "../servFunctions/functions";



const Message=({setMessages,messages=[],i1,rldPage,isOwnMsg,props,redactCB,deleteCB})=>{
    const [user,setUser]=useState({})
    const [messageData,setMessageData]=useState()
    const [isErr,setIsErr]=useState(true)
    const [isLoading,setIsLoading]=useState(true)
    const [redactToggle,setRedactToggle]=useState(false)
    const [text,setText]=useState('')
    const formData=new FormData()
    const router=useHistory()
    useEffect(()=>{
        setIsLoading(true)
       // getMessageByID(props._id,setMessageData,setIsErr)
       // getUser(props.userId,setUser,setIsErr,{})
        setTimeout(()=>{
            setIsLoading(false)
        },500)
        setText(props.text)
    },[])

    const redactMenu=()=>{
        if(isOwnMsg){
            setRedactToggle(redactToggle?false:true)
        }
    }

    const redact=(e)=>{
        e.stopPropagation()
        redactMessage(text,props._id).then(getMessageByID(props._id,setMessageData,setIsErr)).then( redactCB(props._id,text))
    }


    const removeMsg=()=>{
        
       
        deleteMessage(props._id).then(deleteCB(props._id))
    }

    return(
        <div>
            {isLoading?
                <>
                    <div onClick={redactMenu} style={{display:'inline-block',justifyContent:"space-between",padding:"5px",borderRadius:"5px",margin:"5px",maxWidth:"30%"}}>
                        <div>
                            <div onClick={()=>router.push(`/userprofile/${messageData.userId}`)} style={{cursor:'pointer'}}> 
                                {/*user.username*/}
                            </div>
                            <div style={{background:"#add8e6",padding:"5px",borderRadius:"5px"}}>
                                {props.text}
                                {redactToggle?
                                    <div>
                                       {/*<input value={text} onChange={(e)=>setText(e.target.value)}/>*/}
                                        {/*<button style={{display:"inline-block",border:"1px solid black",borderRadius:"10px",padding:"5px",margin:"5px 0px"}} onClick={redact}>redact</button>*/}
                                        <button style={{display:"inline-block",border:"1px solid black",borderRadius:"10px",padding:"5px",margin:"5px 0px"}} onClick={removeMsg}>delete</button>
                                    </div>       
                                :
                                    <div></div>
                                }
                                
                                </div>
                        </div>
                    </div>
                </>
            :
                <>
                    {isErr?
                        <div onClick={redactMenu} style={{display:'inline-block',justifyContent:"space-between",padding:"5px",borderRadius:"5px",margin:"5px",maxWidth:"30%"}}>
                            <div>
                                <div onClick={()=>router.push(`/userprofile/${messageData.userId}`)} style={{cursor:'pointer'}}> 
                                    {/*user.username*/}
                                </div>
                                <div style={{background:"#add8e6",padding:"5px",borderRadius:"5px"}}>
                                    {props.text}
                                    {redactToggle?
                                        <div>
                                            {/*<input value={text} onChange={(e)=>setText(e.target.value)}/>*/}
                                           {/*<button style={{display:"inline-block",border:"1px solid black",borderRadius:"10px",padding:"5px",margin:"5px 0px"}} onClick={redact}>redact</button>*/}
                                            <button style={{display:"inline-block",border:"1px solid black",borderRadius:"10px",padding:"5px",margin:"5px 0px"}} onClick={removeMsg}>delete</button>
                                        </div>       
                                    :
                                        <div></div>
                                    }
                                
                                    </div>
                            </div>
                        </div>
                        
                    :
                        
                            
                    <div onDoubleClick={redactMenu} style={{display:'inline-block',justifyContent:"space-between",padding:"5px",borderRadius:"5px",margin:"5px",maxWidth:"30%"}}>
                        <div>
                            <div onClick={()=>router.push(`/userprofile/${messageData.userId}`)} style={{cursor:'pointer'}}> 
                                {user.username}
                            </div>
                            <div style={{background:"#add8e6",padding:"5px",borderRadius:"5px"}}>
                                {props.text}
                                {redactToggle?
                                    <div>
                                        {/*<input value={text} onChange={(e)=>setText(e.target.value)}/>*/}
                                        {/*<button style={{display:"inline-block",border:"1px solid black",borderRadius:"10px",padding:"5px",margin:"5px 0px"}} onClick={redact}>redact</button>*/}
                                        <button style={{display:"inline-block",border:"1px solid black",borderRadius:"10px",padding:"5px",margin:"5px 0px"}} onClick={removeMsg}>delete</button>
                                    </div>       
                                :
                                    <div></div>
                                }
                            
                                </div>
                        </div>
                    </div>
                    }
                </>
            }
                        
        </div>
    )
}

export default Message