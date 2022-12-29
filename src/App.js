import { BrowserRouter, Navigate, Routes, Route, Switch } from "react-router-dom";
import './App.css';
import Login from 'webpages/Login/index.js'
import Playboard from 'webpages/Playboard/index.js'


import { StoreContext } from 'Contextstore/StoreProvider.js'
import { useContext } from 'react'

//export const URL = process.env.SERVER_URL;

//export const URL = "http://localhost:6001";

export const URL = "https://e-gamenchat-room-api.onrender.com";

function App() {

 // const  {auth}  = useContext(StoreContext)

  const auth = false

  return (
    <div className="App">
<BrowserRouter>
<Routes>

  <Route path="/" element={<Login/>} />
  <Route path="/playarena" element={<Playboard/>} />
  
</Routes>

</BrowserRouter>
     
   

     
    </div>
  );
}

export default App;
