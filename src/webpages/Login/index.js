

import Navbar from "components/Navbar.jsx"
import Form from "components/Form"


import { useState, useEffect } from "react";


import {Box,Typography,useMediaQuery,Divider} from "@mui/material"



const Login = () => { 

    const isDesktop = useMediaQuery("(min-width: 1000px)");
    
    
    return (
<Box height="700px" width="auto" style={{backgroundImage: `url(${"https://res.cloudinary.com/dexpbdlyc/image/upload/v1672069124/gamerimg/gameroon1_yuwips.jpg"})`, backgroundSize:"cover",}}>

<Navbar />

<Box m="1rem" >
<Typography color="cyan" varient="h3">Login/signup</Typography>

</Box>
<Form />
</Box>
)
};

export default Login;