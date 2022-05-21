import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';
import { getMessageLengthByChatID, getUser } from '../servFunctions/functions';



const ChatListIcon=({setActiveChat,setOpponent,data})=>{
    const userIdStrIndex=data.spId.indexOf(localStorage.getItem('userID'))
    let opponentId;
    const router=useHistory()
    if(userIdStrIndex==0){
        opponentId=data.spId.slice(24,48)
    }
    if(userIdStrIndex==24){
        opponentId=data.spId.slice(0,24)
    }
    const [opponentData,setOpponentData]=useState()
    const [isErr,setIsErr]=useState(true)
    const [isLoading,setIsLoading]=useState(true)
    const [msgLength,setMsgLength]=useState(0)
    useEffect(()=>{
        setIsErr(true)
        setIsLoading(true)
        getUser(opponentId,setOpponentData,setIsErr)
        getMessageLengthByChatID(data._id,setMsgLength,setIsErr)
        setTimeout(()=>{setIsLoading(false)},500)
    },[])

    

    
    
    const toChat=()=>{
        setActiveChat(data._id)
        setOpponent(opponentId)
    }
    
    
    return(
        <div>
            {isLoading?
                <>loading</>
            :
                <>
                {isErr?
                    <div></div>
                :
                <>
                    {msgLength==0?
                        <></>
                    :
                        <div style={{borderBottom:"1px solid gray",padding:"5px"}} onClick={toChat}>
                            <p style={{fontSize:"20px"}}>{opponentData.username}</p>
                        </div>
                    }
                </>
                }
                </>
            }
        </div>
    )
}

export default ChatListIcon
