import { useState, useEffect } from "react";

import {Box,Button,TextField,useMediaQuery,Typography,Divider,useTheme, alertClasses,} from "@mui/material";



import { useNavigate } from "react-router-dom";

import { StoreContext } from 'Contextstore/StoreProvider.js'
import { useContext } from 'react'

import { URL } from 'App.js'



const Form = () => {

  const [pageType, setPageType] = useState("login");

  const navigate = useNavigate();

  const  {userbio,token,updateuser,updatetoken,}  = useContext(StoreContext)

 
  const isdesktop = useMediaQuery("(min-width: 1000px)");

  const isLogin = (pageType === "login");
  const isregister = (pageType === "register");

  
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [File, setFile] = useState(null);
  const [filename, setfilename] = useState("");
  const [loading, setloading] = useState(false);
  
  

  const register = async () => 
  {
    console.log("register called")

    if(name !== "" && email !== "" && password !== "" && File !== null && filename !== "" )
    {
    const formData = new FormData();// this allows us to send form info with image (js function )

   
      formData.append("username", name);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("gamerimg", File); // we need to add picture path in the end.
    
    console.log("uploader called")

    const uploaderResponse = await fetch( // post the data to backend
      `${URL}/register`,
      {
        method: "POST",
    
        body: formData,
      }
    );

    const data = await uploaderResponse.json(); // if we get response from server

    
    setname("")
    setemail("")
    setpassword("")
    setFile(null)
    setfilename("")

    if (uploaderResponse.status == 200) {
      setloading(false)
    alert("registered sucessfully")

      setPageType("login");
    }
    if (uploaderResponse.status == 409) {
      setloading(false)
      alert(`server error`)
     // console.log("error getting response from product upload")
    }
    if (uploaderResponse.status == 400) {
      setloading(false)
      alert(`Register Failed-${data.msg}`)
    }

  }
  else{
    setloading(false)
    alert("All fields are required to register")
  }

  };




  const login = async () => 
  {
  console.log("login called")
  
  if(password !== "" && email !== "")
    {

    const loggedInResponse = await fetch(`${URL}/login`, { // post the data to backend
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({email, password}),
    });


    const loggedIn = await loggedInResponse.json(); // if we get response from server, save it

    
    setemail("")
    setpassword("")

    if (loggedInResponse.status == 200 ) {
          setloading(false)
           const usery = loggedIn.user;
           const tokey = loggedIn.token;
           updateuser(usery);
           updatetoken(tokey);
            
         //  console.log(userbio);
         //  console.log(token);
           navigate("/playarena");
       
    }
    if (loggedInResponse.status == 400){
        setloading(false)
        alert("login failed: invalid email/password")
    }
    if (loggedInResponse.status == 500){
        setloading(false)
        alert("server error, please try again later")
    }
   

  }
  else{
    setloading(false)
    alert("All fields are required to login")
  }

  };



  const handleSubmit = async (e) =>  // if they submit form call back for getting login and register actions
  {
    setloading(true)
    //console.log("handle called")
     e.preventDefault()
    if (isLogin) await login(); // calling login

    if (isregister) await register();// calling register
    

  };

  
  
  
  return (

   <Box  backgroundColor="rgb(255,155,255,0.7)" alignContent="center">

    {isdesktop &&  ( <>
         
        <form onSubmit={handleSubmit}>
         
          <Box
            display="grid"
            gap="30px"
            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
            sx={{
              "& > div": { gridColumn: isdesktop ? undefined : "span 4" },
            }}
          >

            {isregister && (
              <>
                <TextField
                  label="Name"
                  type="text"
                  name="username"
                  onChange={e => setname(e.target.value)}
                  value={name}
                  sx={{ gridColumn: "span 2" }}
                />

                <TextField
                  label="email"
                  type="email"
                  name="email"
                  onChange={e => setemail(e.target.value)}
                  value={email}
                  sx={{ gridColumn: "span 2" }}
                />

                <TextField
                  label="password"
                  type="password"
                  name="password"
                  onChange={e => setpassword(e.target.value)}
                  value={password}
                  sx={{ gridColumn: "span 2" }}
                />
                <Box backgroundColor="rgb(25,25,55)" borderRadius="0.75rem" alignItems="center">
                  <Typography color="whitesmoke" textAlign="center" >Upload Profile Pic</Typography>
                  <Divider color="purple" border="1rem"/>
                <input 
                type="file"
                style={{cursor:"pointer", color:"white",}}
                value={filename}
                name = "gamerimg"
                onChange={(e) => {setFile(e.target.files[0]); setfilename(e.target.value);}}
                sx={{ gridColumn: "span 4"}}
                
                />

               </Box>

              </>
            )}

          {isLogin && (

            <Box marginLeft="10rem">

            <TextField
             label="email"
             type="email"
             name="email"
             onChange={e => setemail(e.target.value)}
             value={email}
             sx={{ gridColumn: "span 4" }}
            />

            <TextField
              label="password"
              type="password"
              name="password"
              onChange={e => setpassword(e.target.value)}
              value={password}
              sx={{ gridColumn: "span 4" }}
            />
            </Box>

            )}


          </Box>

          {/* BUTTONS */}
          <Box display="flex" alignItems="center" marginLeft={isLogin ? "10rem" :"0rem"}>
            <Button
              alignItems="center"
              type="submit"
              
              sx={{
                m: "2rem 0",
                
                cursor:"pointer",
                color:"white",
                backgroundColor:"black"
              }}  >

              {isLogin ? "LOGIN" : "REGISTER"}
            </Button>

            <Box>
              {loading && <Box display="flex"  marginLeft="1rem">
                <img src="https://res.cloudinary.com/dexpbdlyc/image/upload/v1672982490/gamerimg/dual_mb7uvj.gif"
                 width="10%"
                 height="50%"
                />
                <Typography marginTop="0.5rem" marginLeft="2rem" color="white">Server initial loading...</Typography>
                </Box>
              }
            </Box>
           
          </Box>

        </form>
      
        <Box sx={{cursor:"pointer", color:"white"}} onClick={() => { {isLogin ? setPageType("register") : setPageType("login") }; setname(""); setemail(""); setpassword(""); setFile(null); setfilename(""); } }>
           {isLogin ? "Don't have account, register here" : "Already have account, login here"}
       </Box>

       

       </>
       )}

{!isdesktop &&  ( <>
      
  <form onSubmit={handleSubmit}>
         
         <Box
           display="grid"
           gap="30px"
           gridTemplateColumns="repeat(4, minmax(0, 1fr))"
           sx={{
             "& > div": { gridColumn: isdesktop ? undefined : "span 4" },
           }}
         >

           {isregister && (
             <>
               <TextField
                 label="Name"
                 type="text"
                 name="username"
                 onChange={e => setname(e.target.value)}
                 value={name}
                 sx={{ gridColumn: "span 2" }}
               />

               <TextField
                 label="email"
                 type="email"
                 name="email"
                 onChange={e => setemail(e.target.value)}
                 value={email}
                 sx={{ gridColumn: "span 2" }}
               />

               <TextField
                 label="password"
                 type="password"
                 name="password"
                 onChange={e => setpassword(e.target.value)}
                 value={password}
                 sx={{ gridColumn: "span 2" }}
               />
               <Box backgroundColor="rgb(25,25,55)" borderRadius="0.75rem" alignItems="center">
                 <Typography color="whitesmoke" textAlign="center" >Upload Profile Pic</Typography>
                 <Divider color="purple" border="1rem"/>
               <input 
               type="file"
               style={{cursor:"pointer", color:"white",}}
               value={filename}
               name = "gamerimg"
               onChange={(e) => {setFile(e.target.files[0]); setfilename(e.target.value);}}
               sx={{ gridColumn: "span 4"}}
               
               />

              </Box>

             </>
           )}

         {isLogin && (

           <Box display="grid">

           <TextField
            label="email"
            type="email"
            name="email"
            onChange={e => setemail(e.target.value)}
            value={email}
            
            style={{marginTop:"1rem", width:"300px"}}
           />

           <TextField
             label="password"
             type="password"
             name="password"
             onChange={e => setpassword(e.target.value)}
             value={password}
           
           style={{marginTop:"1rem", width:"300px"}}
           />
           </Box>

           )}


         </Box>

         {/* BUTTONS */}
         <Box display="flex" alignItems="center" >
           <Button
             alignItems="center"
             type="submit"
             
             sx={{
               m: "2rem 0",
               
               cursor:"pointer",
               color:"white",
               backgroundColor:"black"
             }}  >

             {isLogin ? "LOGIN" : "REGISTER"}
           </Button>

           <Box>
              {loading && <Box display="flex"  marginLeft="1rem">
                <img src="https://res.cloudinary.com/dexpbdlyc/image/upload/v1672982490/gamerimg/bean_u06qrn.gif"
                 width="20%"
                 height="50%"
                />
                <Typography marginTop="1rem" marginLeft="2rem" color="white">Server initial loading...</Typography>
                </Box>
              }
            </Box>

         </Box>

       </form>
     
       <Box sx={{cursor:"pointer", color:"white"}} onClick={() => { {isLogin ? setPageType("register") : setPageType("login") }; setname(""); setemail(""); setpassword(""); setFile(null); setfilename(""); } }>
          {isLogin ? "Don't have account, register here" : "Already have account, login here"}
      </Box>

  </>
       )}

        </Box>
      
    
  );
};

export default Form;


//onClick={() => {
    //setPageType(isLogin ? "upload" : "login");
    
  //  resetForm();
 // }}