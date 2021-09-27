import React, { useState } from "react";
import proPic from "../Images/proPic.png";
import "./Login.css";
import { useHistory } from "react-router-dom";

export default function Login() {
  
    let history = useHistory();
  
    function goHome() {
      history.push("/home");
    }
    function goRegistration() {
      history.push("/registration");
    }
  

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(){

    fetch(`http://localhost:1337/auth/local`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
         
         password:password,
         identifier:username
        }),
      })
        .then(result => result.json())
        .then(result => {
            if(result.jwt){
              goHome()
        }else{
          alert("Invalid Details" )
        }
        })
        .catch(e=>{
            console.log(e)
        })
      }
  return (
    <div className="parentLogin">
        <div className="formlogin"  >
            
            <h1 >Login</h1> <img  src={proPic} style={{borderRadius: '50%',height:"15%"}} />
            <input value={username} onChange={e=>setUsername(e.target.value)} type="text" placeholder="Username" className="field"/>
            <input value={password} onChange={e=>setPassword(e.target.value)} type="password" placeholder="Password" className="field"/>
            
            <div className="Buttons"> 
            <input type="submit" className="submitBtnr"onClick={handleSubmit} />
                <button className="submitBtnr" onClick={goRegistration}>Registration</button>
              </div>
        </div>
    </div>
  );
}