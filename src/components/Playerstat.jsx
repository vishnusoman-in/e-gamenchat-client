import { StoreContext } from 'Contextstore/StoreProvider.js'
import { useContext } from 'react'

import { useState, useEffect } from "react";

import {Box,Typography,useMediaQuery,Divider,TextField,Button} from "@mui/material"

import { URL } from 'App.js'



const Playerstat = () => { 

    const isdesktop = useMediaQuery("(min-width: 1000px)");

    const {userbio,token,updateuser,updatetoken,socketfull,msgarray,updatemychat,opdicepos,mydiceupdate,mydicepos,gamestatus,order,userstore,userinfo}  = useContext(StoreContext)
    
    const handlesearch = () => {
      getplayerstat();
    }

    const getplayerstat = async(req, res) => {
             
        const response = await fetch(`${URL}/room/${(userbio.extras[0])}/find`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });
        
            const data =await response.json()


            if (response.status == 200) {
            
              userstore(data);

              
            }
            if (response.status == 404) {
              
             // console.log("room not found")
            }

    }

    useEffect(() => {
       if(token){
        getplayerstat();
       }
    }, [token])

   

    return(
        <Box marginLeft={isdesktop ? "2rem" : "0rem"} width={isdesktop ? "250px" : "330px"} height={isdesktop ? "600px" : "300px"} >

            {userinfo && userinfo.map(
        ({_id,username,email,bio,password,picturePath,wins,matches,rank}, i) => (

                <Box key={i} display={isdesktop ? "grid" : "grid"} >

                 

                  <Box width= {isdesktop ? "250px" : "330px"} height="260px" borderRadius="0.75rem" backgroundColor="black" sx={{border: 1, borderColor:"#08F7FE",boxShadow: 3,}}> 

                  

                    <Divider  />

                    <Box  m="1rem" display="flex" backgroundColor="black" borderRadius="0.5rem">
                       <img src={picturePath}
                       width= "60px"
                       height= "60px"
                       style={{borderRadius:"50%"}}
                       />
                       <Typography marginLeft="1rem" marginRight={isdesktop ? "3rem" : "2rem"} color="#09FBD3" variant='h4'>{username}</Typography>
                       {username == userbio.username && 
                       <img src="https://res.cloudinary.com/dexpbdlyc/image/upload/v1672233752/gamerimg/violet_vse8ga.png"
                       
                       width= "15px"
                       height= "15px"
                       //style={{borderRadius:"50%"}}
                       />
                      }

                      {username !== userbio.username && 
                       <img src="https://res.cloudinary.com/dexpbdlyc/image/upload/v1672068936/gamerimg/white_cirrgw.png"
                       
                       width= "15px"
                       height= "15px"
                      // style={{borderRadius:"50%"}}
                       />
                      }

                    </Box>


                    <Divider color="#08F7FE" />

                    <Box m="0.5rem" display="flex">
                    <Typography color="white">Rank:</Typography>
                    <Typography marginLeft="0.4rem" color="#09FBD3">{rank == 0 ? "unranked" : ""} {rank == 1 ? "Bronze" : ""} {rank == 2 ? "Silver" : ""} {rank == 3 ? "Gold" : ""}</Typography>
                    </Box>

                    <Divider color="#08F7FE" />

                    <Box m="0.5rem" display="flex">
                    <Typography color="white">Matches:</Typography>
                    <Typography marginLeft="0.4rem" color="#09FBD3">{matches}</Typography>
                    </Box>

                    <Divider color="#08F7FE" />

                    <Box m="0.5rem" display="flex">
                    <Typography color="white">Wins:</Typography>
                    <Typography marginLeft="0.4rem" color="#09FBD3">{wins}</Typography>
                    </Box>

                    <Divider color="#08F7FE" />

                    <Box m="0.5rem" display="flex">
                    <Typography color="white">Email:</Typography>
                    <Typography marginLeft="0.4rem" color="#09FBD3">{email}</Typography>
                    </Box>

                  

            </Box>

            

                    {userinfo && userinfo.length == 1 && <Box backgroundColor="black" sx={{border: 1, borderColor:"#08F7FE", boxShadow: 3,}} borderRadius="0.5rem" textAlign="center">
             <Typography color="#09ABD3">Waiting for players...</Typography>
             <Typography color="#09ABD3">Search to connect fast</Typography>
            <Button  style={{backgroundColor:"#08F7FE", color:"black"}} onClick={() => {handlesearch()}}>Search roommate</Button>
            </Box>
             }
                    
                   

                </Box>
                
                

            ))}

             

        </Box>
    )};


export default Playerstat;