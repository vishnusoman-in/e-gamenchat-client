import { io } from "socket.io-client";


import { useState, useEffect } from "react";

import {useRef} from 'react'

import {Box,Typography,useMediaQuery,Divider,TextField,Button} from "@mui/material"

import { StoreContext } from 'Contextstore/StoreProvider.js'
import { useContext } from 'react'


import {motion} from "framer-motion"


const Snakeboard = ({sizey, rsizey}) => { 

    const isdesktop = useMediaQuery("(min-width: 1000px)");
 
  

const {userbio,token,updateuser,updatetoken,socketfull,msgarray,updatemychat,opdicepos,mydiceupdate,mydicepos,gamestatus,order,userstore,userinfo}  = useContext(StoreContext)



const [roll, setroll] = useState(false)
const [diceroll, setdiceroll] = useState(0)

useEffect(() => {
  if(roll == false){
    
    mydiceupdate(diceroll)
    //console.log(diceroll)
  }
  else{
    setdiceroll(Math.floor(Math.random() * (6 - 1 + 1)) + 1)
  }
}, [roll])




const poscol = [0,1,2,3,4,5,6,7,8,9,10,  10,9,8,7,6,5,4,3,2,1, 1,2,3,4,5,6,7,8,9,10, 10,9,8,7,6,5,4,3,2,1, 1,2,3,4,5,6,7,8,9,10, 10,9,8,7,6,5,4,3,2,1, 1,2,3,4,5,6,7,8,9,10, 10,9,8,7,6,5,4,3,2,1, 1,2,3,4,5,6,7,8,9,10, 10,9,8,7,6,5,4,3,2,1]
const posrow = [0,10,10,10,10,10,10,10,10,10,10, 9,9,9,9,9,9,9,9,9,9, 8,8,8,8,8,8,8,8,8,8, 7,7,7,7,7,7,7,7,7,7, 6,6,6,6,6,6,6,6,6,6, 5,5,5,5,5,5,5,5,5,5, 4,4,4,4,4,4,4,4,4,4, 3,3,3,3,3,3,3,3,3,3, 2,2,2,2,2,2,2,2,2,2, 1,1,1,1,1,1,1,1,1,1]

const mycol = poscol[mydicepos]
const myrow = posrow[mydicepos]

const opcol = poscol[opdicepos]
const oprow = posrow[opdicepos]



useEffect(() => { 

//if(mydicepos == 1 && diceroll == 6){mydiceupdate(37)}  // check it please before..

if(mydicepos == 4){mydiceupdate(10)}
if(mydicepos == 9){mydiceupdate(22)}
if(mydicepos == 21){mydiceupdate(21)}
if(mydicepos == 28){mydiceupdate(56)}

if(mydicepos == 51){mydiceupdate(16)}
if(mydicepos == 71){mydiceupdate(20)}
if(mydicepos == 80){mydiceupdate(20)}// win with 80, direct to 100
// for snakes

if(mydicepos == 17){mydiceupdate(-10)}
if(mydicepos == 54){mydiceupdate(-20)}
if(mydicepos == 62){mydiceupdate(-43)}
if(mydicepos == 64){mydiceupdate(-4)}
if(mydicepos == 87){mydiceupdate(-63)}
if(mydicepos == 93){mydiceupdate(-20)}
if(mydicepos == 95){mydiceupdate(-20)}
if(mydicepos == 98){mydiceupdate(-19)}

if(mydicepos == 100){mydiceupdate(0)}


}, [mydicepos])



    return (

<Box  width={sizey} height={gamestatus == "no" ? "630px" :"1px"} marginLeft={isdesktop ? "8rem" : "0rem"} marginTop={gamestatus == "no" ? "0rem" :"15rem"}>

  {gamestatus == "no" && (<>

<Box>
<Box className="board-background" style={{position:"relative", zIndex:"10", top:(isdesktop ? "0px" : "300px")}} marginLeft={isdesktop ? "2rem" : "0rem"}>

  <img src="https://res.cloudinary.com/dexpbdlyc/image/upload/v1672068998/gamerimg/snakeboardcomplete_zod2d2.jpg"
   width={sizey}
   height={sizey}
   style={{position:"absolute", zIndex:"11", }}
  >
  
  </img>

<Box className="board" alignItems="bottom" style={{position:"absolute", zIndex:"12",}} width={sizey} height={sizey} display="grid" gridTemplateColumns= "repeat(10, 1fr)" gridTemplateRows="repeat(10, 1fr)"   >


<Box className="mypoll" style={{position:"relative", zIndex:"13"}} width="50%" height="50%" gridColumn={mycol} gridRow={myrow}   >
<img src="https://res.cloudinary.com/dexpbdlyc/image/upload/v1672233752/gamerimg/violet_vse8ga.png"
   style={{position:"absolute", zIndex:"14",top:"100%",}}
   width="100%"
   height="100%"
   
  ></img>
</Box>

<Box className="oppopoll" width="5%" height="5%" gridColumn={opcol} gridRow={oprow} sx={{borderColor:"black", border: 1, boxShadow: 3,}}  >
<img src="https://res.cloudinary.com/dexpbdlyc/image/upload/v1672068936/gamerimg/white_cirrgw.png"
style={{position:"absolute", zIndex:"15",}}
   width="5%"
   height="5%"
   
  ></img>
</Box>

</Box>

</Box>

</Box>

{userinfo && userinfo.length == 2 && 

<Box display="flex" onClick={() => {(order == 0) ? setroll(roll ? false:true) : setroll(roll)}}  width={sizey} style={{position:"absolute", zIndex:"16", top:(isdesktop ? "770px": "975px"),left:(isdesktop ? "550px": "20px"), borderRadius:"0.5rem", cursor:"pointer" }}>
{order == 0 && <>

  
  <Typography color="cyan"  marginRight="2rem">{roll ? "Click to stop" : "Click to roll " }</Typography>
  

   <motion.img src="https://res.cloudinary.com/dexpbdlyc/image/upload/v1672068916/gamerimg/dice3d_veghmk.gif"   animate={{x: 40,scale: roll ? 1:0,}} transition={{ duration: 0.5, }} initial={{scale: 0}}  exit={{scale: 0}}
   width="40px"
   height="40px"
  >
  </motion.img>
 {diceroll == 1 &&
  <motion.img src="https://res.cloudinary.com/dexpbdlyc/image/upload/v1672068907/gamerimg/dice1_x0yzog.png" animate={{scale: roll ? 0 : 1}} transition={{ duration: 0.5, }}
   width="40px"
   height="40px"
  >
  </motion.img>
}
{diceroll == 2 &&
  <motion.img src="https://res.cloudinary.com/dexpbdlyc/image/upload/v1672068940/gamerimg/dice2_mfjsug.png" animate={{scale: roll ? 0 : 1}} transition={{ duration: 0.5, }}
   width="40px"
   height="40px"
  >
  </motion.img>
}
{diceroll == 3 &&
  <motion.img src="https://res.cloudinary.com/dexpbdlyc/image/upload/v1672068984/gamerimg/dice3_nohvsi.png" animate={{scale: roll ? 0 : 1}} transition={{ duration: 0.5, }}
   width="40px"
   height="40px"
  >
  </motion.img>
}
{diceroll == 4 &&
  <motion.img src="https://res.cloudinary.com/dexpbdlyc/image/upload/v1672068950/gamerimg/dice4_zrkbh2.png" animate={{scale: roll ? 0 : 1}} transition={{ duration: 0.5, }}
   width="40px"
   height="40px"
  >
  </motion.img>
}
{diceroll == 5 &&
  <motion.img src="https://res.cloudinary.com/dexpbdlyc/image/upload/v1672068985/gamerimg/dice5_ienfhw.png" animate={{scale: roll ? 0 : 1}} transition={{ duration: 0.5, }}
   width="40px"
   height="40px"
  >
  </motion.img>
}
{diceroll == 6 &&
  <motion.img src="https://res.cloudinary.com/dexpbdlyc/image/upload/v1672068988/gamerimg/dice6_klaheq.png" animate={{scale: roll ? 0 : 1}} transition={{ duration: 0.5, }}
   width="40px"
   height="40px"
  >
  </motion.img>
}

</>}

{order == 1 && <>
  <Typography color="cyan" marginRight="2rem">Opponent's roll</Typography>

  {diceroll == 1 &&
  <motion.img src="https://res.cloudinary.com/dexpbdlyc/image/upload/v1672068907/gamerimg/dice1_x0yzog.png" animate={{scale: roll ? 0 : 1}} transition={{ duration: 0.5, }}
   width="40px"
   height="40px"
  >
  </motion.img>
}
{diceroll == 2 &&
  <motion.img src="https://res.cloudinary.com/dexpbdlyc/image/upload/v1672068940/gamerimg/dice2_mfjsug.png" animate={{scale: roll ? 0 : 1}} transition={{ duration: 0.5, }}
   width="40px"
   height="40px"
  >
  </motion.img>
}
{diceroll == 3 &&
  <motion.img src="https://res.cloudinary.com/dexpbdlyc/image/upload/v1672068984/gamerimg/dice3_nohvsi.png" animate={{scale: roll ? 0 : 1}} transition={{ duration: 0.5, }}
   width="40px"
   height="40px"
  >
  </motion.img>
}
{diceroll == 4 &&
  <motion.img src="https://res.cloudinary.com/dexpbdlyc/image/upload/v1672068950/gamerimg/dice4_zrkbh2.png" animate={{scale: roll ? 0 : 1}} transition={{ duration: 0.5, }}
   width="40px"
   height="40px"
  >
  </motion.img>
}
{diceroll == 5 &&
  <motion.img src="https://res.cloudinary.com/dexpbdlyc/image/upload/v1672068985/gamerimg/dice5_ienfhw.png" animate={{scale: roll ? 0 : 1}} transition={{ duration: 0.5, }}
   width="40px"
   height="40px"
  >
  </motion.img>
}
{diceroll == 6 &&
  <motion.img src="https://res.cloudinary.com/dexpbdlyc/image/upload/v1672068988/gamerimg/dice6_klaheq.png" animate={{scale: roll ? 0 : 1}} transition={{ duration: 0.5, }}
   width="40px"
   height="40px"
  >
  </motion.img>
}

</>}

</Box>
}


</>
)}

{gamestatus !== "no" && (
  <Box sx={{border:1, borderColor:"purple", borderRadius:"0.75rem", }} backgroundColor="black" width="300px" height="100px" textAlign="center" marginLeft={isdesktop ? "2rem":"0.75rem"}>
    <Typography m="2rem" color="red">{gamestatus} won the match</Typography>
    <Typography color="white">Please close the window and relogin to play next match</Typography>
  </Box>

)}


</Box>

)};

export default Snakeboard;