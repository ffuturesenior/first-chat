import axios from 'axios'
import { useContext } from 'react'
import { dispatch } from 'redux-thunk'
import { AdminContext } from '..'
import { setUser } from '../redux/userReducer'

const site_url=`https://chat-db-sync.herokuapp.com/chathuyat`


export async function registrate(e,userData){
    e.preventDefault()
    try{
        if(!userData.email||!userData.username||!userData.password){
            return res.status(400).alert("bad request")
        }
        const res= await axios.post(`${site_url}/users/registrate`,{
            username:userData.username,
            email:userData.email,
            pswd:userData.password,
            admin:false,
            caption:"",
            avatar:""

        })
        alert("created")
    }catch(e){
        alert(e.response.data.message)
    }
}

export const login=(userData,setIsAdmin)=>{
    return async dispatch=>{
        try{
            if(!userData.email||!userData.username||!userData.password){
                return res.status(400).alert("bad request")
            }
            const res= await axios.post(`${site_url}/users/login`,{
                username:userData.username,
                email:userData.email,
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
}

export const rehost=(setIsAdmin)=>{
    return async dispatch=>{
        try{
            const res= await axios.get(`${site_url}/users/auth/${localStorage.getItem('userID')}`)
            dispatch(setUser(res.data.user))
            localStorage.setItem('userID',res.data.user.id)
            setIsAdmin(res.data.user.admin)
            //alert("logined")
        }catch(e){
            console.log(e)
            
            localStorage.removeItem('userID')
        }       
    }

}


export async function getUser(id,setFunc,setIsErr,setPrevData){
        try{
            setIsErr(true)
            const res= await axios.get(`${site_url}/users/${id}`)
            setFunc(res.data)
            setPrevData({
                username:`${res.data.username}`,
                caption:`${res.data.caption}`
            })
            //alert("logined")
        }catch(e){
          //  console.log(e)    
                setIsErr(true)
        }finally{
            setIsErr(false)
        }
}



export async function  redactUser(id,entryData){
    try{
        const prevData=await axios.get(`${site_url}/users/${id}`)

        const res= await axios.put(`${site_url}/users/update/${id}`,entryData)
    }catch(e){
        console.log(e)     
    }
}








export async function getUserByName(username,setFunc){
    try{
        const res = await axios.get(`${site_url}/users/byname/${username}`)
        setFunc(res.data)
    }catch(error){
        console.log(error)
    }
}

export async function getP2PChat(user1ID,user2ID,setFunc,setIsErr){
    try{
        setIsErr(true)
        const res = await axios.get(`${site_url}/p2pchats/getbyusers/${user1ID}&${user2ID}`)
        setFunc(res.data)
        console.log(res.data)
        setIsErr(false)
    }catch(error){
        console.log(error)
        //setIsErr(true)
    }
}



export async function createP2PChat(user1ID,user2ID){
    try{
        const res = await axios.post(`${site_url}/p2pchats`,{
            name:" ",
            spId:`${user1ID}${user2ID}`
        })
    }catch(error){
        console.log(error)
    }
}

export async function getP2PChatByUserId(userID,setFunc,setIsErr){
    try{
        setIsErr(true)
        const res = await axios.get(`${site_url}/p2pchats/getbyuserId/${userID}`)
        setFunc(res.data)
        setIsErr(false)
    }catch(error){
        console.log(error)
       // setIsErr(true)
    }
}

export async function getMessageByID(msgId,setFunc,setIsErr){
    try{
        setIsErr(true)
        const res = await axios.get(`${site_url}/messages/${msgId}`)
        setFunc(res.data)
        setIsErr(false)
    }catch(error){
        console.log(error)
        //setIsErr(true)
    }
}

export async function getMessageByChatID(chatID,setFunc,setIsErr,maxCount,setIsMessages){
    try{
        setIsErr(true)
        setIsMessages(false)
        const res = await axios.get(`${site_url}/messages/getbychatid/${chatID}&${maxCount}`)
        setFunc(res.data)
        setIsErr(false)
        setIsMessages(true)
        return res.data
    }catch(error){
        console.log(error)
      // setIsErr(true)
    }
}



export async function getMessageLengthByChatID(chatID,setFunc,setIsErr,maxCount){
    try{
        setIsErr(true)
        const res = await axios.get(`${site_url}/messages/getbychatid/${chatID}`)
        setFunc(res.data)
        setIsErr(false)
    }catch(error){
        console.log(error)
       // setIsErr(true)
    }
}

export async function postMessage(inputedData,setFunc,variable,setId){
    try{
        const res = await axios.post(`${site_url}/messages`,inputedData)
        setFunc([...variable,res.data])
       // console.log(res.data._id)
        setId(res.data._id)
    }catch(error){
        console.log(error)
    }
}


export async function redactMessage(inputedData,id){
    try{
        const res = await axios.put(`${site_url}/messages/update/${id}`,{
            text:inputedData
        })
    }catch(error){
        console.log(error)
    }
}




export async function deleteMessage(id){
    try{
        const res = await axios.delete(`${site_url}/messages/${id}`)
    }catch(error){
        console.log(error)
    }
}




export async function getparcipiantsByUserId(userID,setFunc,setIsErr){
    try{
        setIsErr(true)
        const res = await axios.get(`${site_url}/parcipiants/byUserId/${userID}`)
        setFunc(res.data)
        setIsErr(false)
    }catch(error){
        console.log(error)
       // setIsErr(true)
    }
}

export async function createRoom(roomName){
    try{
        const res = await axios.post(`${site_url}/chats`,{
            name:roomName
        })
        setTimeout(()=>{},2000)
        const res2=await axios.post(`${site_url}/parcipiants`,{
            userId:localStorage.getItem('userID'),
            chatID:res.data._id,
            admin:true})
    }catch(error){
        console.log(error)
       // setIsErr(true)
    }
}


export async function getRooms(parcipiantsID,setFunc,variable){
    console.log('wefwf')
    try{
            const res = await axios.get(`${site_url}/chats/${parcipiantsID}`)
            console.log(res)            
            setFunc([...variable,res.data])
    }catch(error){
        console.log(error)
       // setIsErr(true)
    }
}