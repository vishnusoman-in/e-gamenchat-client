import { io } from "socket.io-client";

import Navbar from "components/Navbar.jsx"


import { useState, useEffect } from "react";


import {Box,Typography,useMediaQuery,Divider} from "@mui/material"

import { StoreContext } from 'Contextstore/StoreProvider.js'
import { useContext } from 'react'

import Chatapp from "components/Chatapp.jsx"

import Snakeboard from 'components/Snakeboard.jsx'

import Playerstat from 'components/Playerstat.jsx'

//import gameroom from 'assets/gameroon1.jpg'

//import bottomimg from 'assets/bottom1.jpg'

//import letgo from 'assets/go.png'



const Playboard = () => { 

    const isdesktop = useMediaQuery("(min-width: 1000px)");
    
    const  {userbio,token,updateuser,updatetoken,socketfull}  = useContext(StoreContext)
  
   


    return (
<Box  >


<Navbar />


<Box display={isdesktop ? "flex" : "grid"} style={{backgroundImage: `url(${"https://res.cloudinary.com/dexpbdlyc/image/upload/v1672069124/gamerimg/gameroon1_yuwips.jpg"})`, backgroundSize:"cover",}}>

<Playerstat />

<Snakeboard sizey={isdesktop ? "600px" : "330px"} rsizey={isdesktop ? "740px" : "540px"}/>

<Chatapp />

</Box>

{isdesktop && (<>

<Box style={{position:"relative", zIndex:"50"}}> 

 <img src="https://res.cloudinary.com/dexpbdlyc/image/upload/v1672068970/gamerimg/bottom1_jjwsiy.jpg" 
 style={{position:"absolute", zIndex:"51"}}
 width="1500"
 height="100"
 />

<img src="https://res.cloudinary.com/dexpbdlyc/image/upload/v1672069145/gamerimg/go_khsta6.png" 
style={{position:"absolute", zIndex:"52", left:"450px", top:"77px"}}
 width="80"
 height="80"
 />

</Box>

</>)}



</Box>
)
};

export default Playboard;