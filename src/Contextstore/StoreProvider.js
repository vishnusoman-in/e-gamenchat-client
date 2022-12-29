import React, { useContext, useEffect, useState } from 'react'
import io from 'socket.io-client'
import { URL } from 'App.js'


 const StoreContext = React.createContext()





const StoreProvider = ({ children }) => {


  const [socket, setSocket] = useState(1)
  const [auth, setauth] = useState(false)
  const [contacts, setContacts] = useState(5)

 
  const createContact = () => { 
    setauth(auth ? false:true)
  }

  const [userbio, setuserbio] = useState({})
  const [token, settoken] = useState("")
  const [socketfull, setsocketfull] = useState(null)
  const [msgarray, setmsgarray] = useState([])
  const [opdicepos, setopdicepos] = useState(1)
  const [mydicepos, setmydicepos] = useState(1)
  const [gamestatus, setgamestatus] = useState("no")
  const [order, setorder] = useState(0)
  const [userinfo, setuserinfo] = useState(null)

  // store to sessionStorage

  if(socketfull){
    
 }

 const userstore =(data) => {
  setuserinfo(data)
  sessionStorage.setItem("userstore", JSON.stringify(data));
 }

  const updateuser =(state) => {
    setuserbio(state)
    sessionStorage.setItem("userbio", JSON.stringify(state));
  }
 

  const updatetoken =(state) => {
    settoken(state)
    sessionStorage.setItem("token", state);
  }


  const updatemychat = (Value) => {
    
    if(socketfull){
    socketfull.emit('join-room', userbio.extras[0])
    socketfull.emit('send-msg', Value, userbio.extras[0])
    }
    //console.log(Value)
    const modmsg = `You: ${Value}`
    
    setmsgarray(current => [...current, modmsg]);
    sessionStorage.setItem("messages", JSON.stringify(msgarray));
  }

  const mydiceupdate =(diceroll) => {
    if(socketfull){
     setorder(1);
     sessionStorage.setItem("order", 1);
      if(diceroll == 0){
        socketfull.emit('join-room', userbio.extras[0])
        socketfull.emit('game-status', userbio.username, userbio.extras[0])
        setgamestatus(userbio.username);
        sessionStorage.setItem("winner", userbio.username);
      }
      if(diceroll !== 0 && diceroll !== 1000){

      const mypos = mydicepos + diceroll;

      if(mypos < 101){
      socketfull.emit('join-room', userbio.extras[0])
      socketfull.emit('send-dice', mypos, userbio.extras[0])
      setmydicepos(mypos);
      sessionStorage.setItem("my", mypos);
      }
      
      if(mypos > 100){
        const oldpos = mydicepos;
        socketfull.emit('join-room', userbio.extras[0])
        socketfull.emit('send-dice', oldpos, userbio.extras[0])
        setmydicepos(oldpos);
        sessionStorage.setItem("my", oldpos);
      }

      }
     
    }
  }

 

  // intial connection for socket
  useEffect(() => {

    const socket = io.connect(`${URL}`, {query: {token}} );
    
    socket.on('connect', () => {
      
       // console.log(socket.id)
        setsocketfull(socket)
        
    })
   
   socket.on('rec-msg', (msg) =>{
 
    const modfiedmsg = `Opponent: ${msg}`
    
    setmsgarray(current => [...current, modfiedmsg]);
    sessionStorage.setItem("messages", JSON.stringify(msgarray));
    //console.log(msgarray)
    return () => socketfull.off('rec-msg')

  })

  socket.on('rec-dice', (opdice) =>{
    setorder(0)
    sessionStorage.setItem("order", 0);
   
    setopdicepos(opdice);
    sessionStorage.setItem("opponent", opdice);
   
    return () => socketfull.off('rec-dice')

  })

  socket.on('rec-status', (name) =>{
 
    
     setgamestatus(name);
     sessionStorage.setItem("winner", name);
     
     return () => socketfull.off('rec-status')
 
   })
  
  }, [token]);
 
  
  useEffect(() => {
    if(socketfull){
    socketfull.emit('join-room', userbio.extras[0])
    }
  }, [socketfull]);
  

  // retrieve from sessionStorage if we refresh tab..........

  useEffect(() =>{

    let ub = sessionStorage.getItem("userbio");
    if(ub) {setuserbio(JSON.parse(ub))}
  
    let tk = sessionStorage.getItem("token");
    if(tk) {settoken(tk)}

    let ms = sessionStorage.getItem("messages");
    if(ms) {setmsgarray(JSON.parse(ms))}

    let op = sessionStorage.getItem("opponent");
    if(op) {setopdicepos(op)}

    let my = sessionStorage.getItem("my");
    if(my) {setmydicepos(my)}

    let gs = sessionStorage.getItem("winner");
    if(gs) {setgamestatus(gs)}

    let or = sessionStorage.getItem("order"); 
    if(or) {setorder(or)}

    let ui = sessionStorage.getItem("userstore"); 
    if(ui) {setuserinfo(JSON.parse(ui))}

    


   }, [])

   


  return (
    <StoreContext.Provider value={{userbio,token,updateuser,updatetoken,socketfull,msgarray,updatemychat,opdicepos,mydiceupdate,mydicepos,gamestatus,order,userstore,userinfo }} >
      {children}
    </StoreContext.Provider>
  );

};

export {StoreContext, StoreProvider}
