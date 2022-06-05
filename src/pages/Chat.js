import  React,{useEffect, useRef, useState} from 'react'
import {useHistory, useParams} from 'react-router-dom'
import Message from '../components/Message'
import { getMessageByChatID, getMessageLengthByChatID, getUser, postMessage } from '../servFunctions/functions'
import {io} from 'socket.io-client'


const Chat=()=>{
    const socket=io('https://chat-socket-sync.herokuapp.com')
    const {id,opponent}=useParams()
    const [messages,setMessages]=useState([])
    const [lastMsgId,setLastMsgId]=useState("21d1d1d")
    const [lastMsg,setLastMsg]=useState({})
    const [messagesLength,setMessagelength]=useState(0);
    const [opponentData,setOpponentData]=useState({})
    const [isErr,setIsErr]=useState(true)
    const [isLoading,setIsLoading]=useState(true)
    const [isMessages,setIsMessages]=useState(false)
    const formData=new FormData()
    const router=useHistory()
    const loadZone=useRef()
    const scrollRef=useRef()
    const bottomRef=useRef()
    useEffect(()=>{
        setIsLoading(true)
        
        getUser(opponent,setOpponentData,setIsErr)
        getMessageLengthByChatID(id,setMessagelength,setIsErr)
        getMessageByChatID(id,setMessages,setIsErr,1000000,setIsMessages)
        //getMessageByChatID(id,setMessages,setIsErr,maxCount)
        setIsErr(true)
        socket.emit('joinRoom',id)
        setIsErr(false)
        setTimeout(()=>{setIsLoading(false)},2000)
        console.log(messages.length)
        //console.log(id)
    },[opponent,id])

   
    
       
    socket.on('getMsg',({_id,userId,chatId,text})=>{
        setLastMsg({_id:_id,userId:userId,chatID:chatId,text:text,iamges:" "})
        bottomRef.current?.scrollIntoView({behavior:"smooth"})
    })

    
    useEffect(()=>{
        console.log(lastMsg)
        setMessages(prev=>[...prev,lastMsg])
        bottomRef.current?.scrollIntoView({behavior:"smooth"})
    },[lastMsg])

  /*  socket.on('getRedactetMsg',({i,text})=>{
        getMessageByChatID(id,setMessages,setIsErr,1000000)
        scrollRef.current?.scrollIntoView({behavior:"smooth"})
    })*/
    
    socket.on('getDeletedMsg',(i)=>{
        /*console.log(i.i)        
        console.log(messages)
        const hui=messages.filter((p)=>{
            if(p._id!==i.i) return p
        })
        setMessages(hui)
        console.log(messages)*/
        getMessageByChatID(id,setMessages,setIsErr,100000,setIsMessages)
       // bottomRef.current?.scrollIntoView({behavior:"smooth"})
    })

    const redactMsg=(i,text)=>{
        socket.emit('redactMsg',i,text,id)
    }
   
    const deleteMsg=(msgid)=>{
        socket.emit('deleteMsg',id,msgid)
    }

    

    useEffect(()=>{
        scrollRef.current?.scrollIntoView({behavior:"smooth"})
    },[isLoading])
    
   
    


    const [message,setMessage]=useState({
        chatID:id,
        userId:localStorage.getItem('userID'),
        text:""
    })
    const sendMessage=()=>{
        if(message.text.length>=1){
            formData.append('userId',localStorage.getItem('userID'))
            formData.append('chatID',id)
            formData.append('text',message.text)
            postMessage(formData,setMessages,messages,setLastMsgId).then(()=>{ 
                socket.emit('sendMsg',lastMsgId,localStorage.getItem('userID'),message.text,id)
                setMessage({...message,text:""})
            })
        }
        
    }

    const rld=()=>{
        setIsErr(true)
        getMessageByChatID(id,setMessages,setIsErr,1000000)
        setTimeout(()=>{setIsErr(false)},2000)
    }

    return(
        <div>
           
            {isLoading?
                <>loading
                    <button style={{border:"1px solid black",borderRadius:"5px",padding:"5px"}} onClick={()=>{router.goBack()}}>back</button>
                    <div style={{padding:"20px"}}>
                    <div style={{maxWidth:"800px",maxHeight:"500px",overflow:"hidden",margin:'0px auto',border:"3px solid blue",borderRadius:"15px"}}>
                        <div  onClick={()=>router.push(`/userprofile/${opponent}`)} style={{textAlign:"center",background:"#E1D9D1",padding:"10px 0px"}}><strong>{opponentData.username}</strong></div>
                        <div style={{maxHeight:"100%"}}>
                            <div style={{height:"400px",overflow:"auto",position:"relative",top:"0%"}}>
                               
                            </div>
                            <div style={{padding:"5px",textAlign:"center",background:"#E1D9D1"}}>
                                <input style={{border:"2px solid blue",borderRadius:"10px"}} value={message.text} onChange={(e)=>setMessage({...message,text:e.target.value})}/>
                                <button style={{background:"blue",padding:"5px",borderRadius:"10px"}} onClick={sendMessage}>otpravitb</button>
                            </div>
                        </div>
                    </div>
                </div>
                </>
            :
                <>
                    {isErr?
                        <div>
                            err
                            <button style={{background:"grey",padding:"5px",borderRadius:"10px"}} onClick={rld}>reload</button>
                        </div>
                    :
                    <div style={{padding:"20px"}}>
                        <div style={{maxWidth:"800px",maxHeight:"500px",overflow:"hidden",margin:'0px auto',border:"3px solid blue",borderRadius:"15px"}}>
                            <div onClick={()=>router.push(`/userprofile/${opponent}`)} style={{textAlign:"center",background:"#E1D9D1",padding:"10px 0px"}}><strong>{opponentData.username}</strong></div>
                            <div style={{maxHeight:"100%"}}>
                                <div style={{height:"400px",overflow:"auto",position:"relative",top:"0%"}}>
                                    
                                    {messages.map((p,i)=>
                                        <div ref={scrollRef} key={p._id}>
                                            {p.userId==opponent?
                                                <div style={{textAlign:"left"}}>
                                                    <Message setMessages={setMessages} messages={messages} i1={i} isOwnMsg={false} props={p} deleteCB={deleteMsg}/>
                                                </div>
                                            :
                                                <div style={{textAlign:"right"}}>
                                                    <Message setMessages={setMessages} messages={messages} i1={i} rldPage={rld} isOwnMsg={true} props={p} redactCB={redactMsg} deleteCB={deleteMsg}/>
                                                </div>
                                            }
                                        </div>
                                    )}
                                    <div ref={bottomRef}></div>
                                </div>
                                <div style={{textAlign:"center",background:"#E1D9D1",padding:"10px 0px"}}>
                                    <input style={{border:"2px solid blue",borderRadius:"10px"}} value={message.text} onChange={(e)=>setMessage({...message,text:e.target.value})}/>
                                    <button style={{background:"blue",padding:"5px",borderRadius:"10px"}} onClick={sendMessage}>otpravitb</button>
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                    }
                </>
            }
        </div>
    )
}

export default Chat



