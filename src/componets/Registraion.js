import React, { useState } from "react";
import proPic from "../Images/proPic.png";

import "./Registraion.css";
import { useHistory } from "react-router-dom";

export default function Registration() {
  let history = useHistory();
  
    function goLogin() {
      history.push("/");
    }
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  

  function handleSubmit() {

fetch(`http://localhost:1337/auth/local/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
     email:email,
     password:password,
     username:username
    }),
  })
    .then(result => result.json())
    .then(result => {
        alert('"Go to login Page now"')

     
    })
    .catch(e=>{
        console.log(e)
    })
  }

  return (
    <div className="parentLogin" >
        <div className="formlogin" >
            <h2>User registration</h2>
            <img  src={proPic} style={{borderRadius: '50%',height:"15%"}} />
            <input type="text" placeholder="Set Username" value={username} onChange={e=>setUsername(e.target.value)} className="field"/>
            <input type="email" value={email} placeholder="Enter Email" className="field" onChange={e=>setEmail(e.target.value)}/>
            <input type="password" autoFill="new-password" value={password} placeholder="Set Password" className="field" onChange={e=>setPassword(e.target.value)}/>
           
           
           <div className="Buttons"> 
                <input type="submit" className="submitBtnr" onClick={handleSubmit}/>
                 <button className="submitBtnr" onClick={goLogin} >Log in</button>
              </div>
        </div>
    </div>
  );
}