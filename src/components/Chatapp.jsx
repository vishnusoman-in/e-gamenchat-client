
import { useState, useEffect } from "react";

import {useRef} from 'react'

import {Box,Typography,useMediaQuery,Divider,TextField,Button} from "@mui/material"

import { StoreContext } from 'Contextstore/StoreProvider.js'
import { useContext } from 'react'


const Chatapp = () => { 

    const isdesktop = useMediaQuery("(min-width: 1000px)");

    const refbox = useRef(null)

    const entercontrol = useRef(null)

    const btncontrol = useRef(null)
    
    const  {userbio,token,updateuser,updatetoken,socketfull,updatemychat,msgarray,}  = useContext(StoreContext)

    const[Value, setValue] = useState("")


useEffect(() => {
        refbox.current.scrollBy({top: 500,behavior: "smooth"})
    }, [msgarray])



const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
     
      btncontrol.current.click();
     
    }
}

const scrodown = () => {
       
         refbox.current.scrollBy({top: 400,behavior: "smooth"})
      }



    return (

<Box marginLeft={isdesktop ? "2rem": "0rem"} marginTop={isdesktop ? "0rem": "5rem"}>



<Box height="420px" width={isdesktop ? "auto": "330px"}>

<Box backgroundColor="#08F7FE" style={{borderTopLeftRadius:"0.5rem", borderTopRightRadius:"0.5rem"}}>
<Typography color="#282726" textAlign="center" varient="h3"> Chat Rival </Typography>
</Box>

<Box ref={refbox} height="420px" overflow="scroll" sx={{border: 1, borderColor:"#ADEFD1FF", backgroundColor:"whitesmoke",}}>
{msgarray && msgarray.map((data, index) => (

    <Box  key={index} backgroundColor="#09FBD3" marginTop="0.5rem" marginLeft="0.5rem" borderRadius="0.5rem"> 
     <Typography marginLeft="0.3rem"  color="black">{data}</Typography>
    
    </Box>
))
}
</Box>

<Box display="flex" backgroundColor="white">
<TextField onKeyDown={handleKeyDown} type="text" label="type message" value={Value} onChange={(e) => setValue(e.target.value)}></TextField>
<Button ref={btncontrol} style={{backgroundColor:"#08F7FE", color:"black", width:(isdesktop ? "auto" : "110px"),}} type="submit" onClick={() => {updatemychat(Value); setValue(""); {scrodown()} }}> SEND</Button>

</Box>

</Box>

</Box>

)};

export default Chatapp;