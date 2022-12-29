import { useState, useEffect } from "react";

import {Box,Button,Typography,useMediaQuery,Divider} from "@mui/material"


const Navbar = () => { 

    const isdesktop = useMediaQuery("(min-width: 1000px)");

    const[contactus, setcontactus] = useState(false)
    const[rules, setrules] = useState(false)
    const[about, setabout] = useState(false)
    
    return (

<Box display="flex"  backgroundColor="black" sx={{borderBottom:1, bordershadow: 3,borderColor:"magenta", position:"relative", zIndex:"100"}}>

{isdesktop && ( <>

<img src="https://res.cloudinary.com/dexpbdlyc/image/upload/v1672118662/gamerimg/logy_ulyu0t.png"
 width="20"
 height="20"
 
/>


<Typography onClick={() =>{}} marginLeft="0.5rem" color="cyan" style={{cursor:"pointer",}} varient="h3">GAMEnCHAT </Typography>

<Typography onClick={() =>{setrules(rules ? false: true)}} marginLeft="7rem" color="white" style={{cursor:"pointer",}}  >Rules </Typography>






<Typography onClick={() =>{setabout(about ? false: true)}} marginLeft="7rem" color="white" style={{cursor:"pointer",}} >About </Typography>

<Typography onClick={() =>{setcontactus(contactus ? false: true)}} marginLeft="65rem" color="white" style={{cursor:"pointer",}}>Contact </Typography>



{contactus && <Box sx={{position:"absolute", zIndex:"101",left:(isdesktop ? "500px": "60px"),top:"30px", backgroundColor:"black", border: 1,borderColor:"white", borderRadius:"0.75rem", width:"300", height:"300"}}>

    <Typography variant="h5" color="white">Contact us</Typography>
    <Typography color="white">1.Email: support@chatngame.com</Typography>
    <Typography color="white">2.phone: +91-9090909090</Typography>

</Box>}

{rules && <Box sx={{position:"absolute", zIndex:"102",left:(isdesktop ? "500px": "60px"),top:"30px", backgroundColor:"black", border: 1,borderColor:"white", borderRadius:"0.75rem", width:"300", height:"300"}}>

    <Typography variant="h5" color="white">Rules</Typography>
    <Typography color="white">1.exact same rules of snake and ladder game</Typography>
    <Typography color="white">2.first ladder is temporarly non-operational</Typography>
    <Typography color="white">3.Landing 80 make you win :)</Typography>
    <Typography color="white">4.you can chat with the player</Typography>
    <Typography color="white">5.check player records and stats of your opponent</Typography>

</Box>}

{about && <Box sx={{position:"absolute", zIndex:"103",left:(isdesktop ? "500px": "60px"),top:"30px", backgroundColor:"black", border: 1,borderColor:"white", borderRadius:"0.75rem", width:"300", height:"300"}}>

    <Typography variant="h5" color="white">About</Typography>
    <Typography color="white">Developer: Vishnu Soman</Typography>
    <Typography color="white">Role: Full stack developer</Typography>
    <Typography color="white">Tools: MERN - React,Mangodb,Express & Node </Typography>

</Box>}

</>)}

{!isdesktop && ( <>
     
    <img src="https://res.cloudinary.com/dexpbdlyc/image/upload/v1672118662/gamerimg/logy_ulyu0t.png"
 width="20"
 height="20"
 
/>


<Typography onClick={() =>{}} marginLeft="0.5rem" color="cyan" style={{cursor:"pointer",}} varient="h3">GAMEnCHAT </Typography>

<Typography onClick={() =>{setrules(rules ? false: true)}} marginLeft="1rem" color="white" style={{cursor:"pointer",}}  >Rules </Typography>






<Typography onClick={() =>{setabout(about ? false: true)}} marginLeft="1rem" color="white" style={{cursor:"pointer",}} >About </Typography>

<Typography onClick={() =>{setcontactus(contactus ? false: true)}} marginLeft="1rem" color="white" style={{cursor:"pointer",}}>Contact </Typography>



{contactus && <Box sx={{position:"absolute", zIndex:"101",left:(isdesktop ? "500px": "60px"),top:"30px", backgroundColor:"black", border: 1,borderColor:"white", borderRadius:"0.75rem", width:"300", height:"300"}}>

    <Typography variant="h5" color="white">Contact us</Typography>
    <Typography color="white">1.Email: support@chatngame.com</Typography>
    <Typography color="white">2.phone: +91-9090909090</Typography>

</Box>}

{rules && <Box sx={{position:"absolute", zIndex:"102",left:(isdesktop ? "500px": "60px"),top:"30px", backgroundColor:"black", border: 1,borderColor:"white", borderRadius:"0.75rem", width:"300", height:"300"}}>

    <Typography variant="h5" color="white">Rules</Typography>
    <Typography color="white">1.exact same rules of snake and ladder game</Typography>
    <Typography color="white">2.first ladder is temporarly non-operational</Typography>
    <Typography color="white">3.Landing 80 make you win :)</Typography>
    <Typography color="white">4.you can chat with the player</Typography>
    <Typography color="white">5.check player records and stats of your opponent</Typography>

</Box>}

{about && <Box sx={{position:"absolute", zIndex:"103",left:(isdesktop ? "500px": "60px"),top:"30px", backgroundColor:"black", border: 1,borderColor:"white", borderRadius:"0.75rem", width:"300", height:"300"}}>

    <Typography variant="h5" color="white">About</Typography>
    <Typography color="white">Developer: Vishnu Soman</Typography>
    <Typography color="white">Role: Full stack developer</Typography>
    <Typography color="white">Tools: MERN - React,Mangodb,Express & Node </Typography>

</Box>}


</>)}

</Box>
)

};

export default Navbar;