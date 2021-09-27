import React from 'react'
import "./Header.css";
import { useHistory } from "react-router-dom";
export default function Header() {
  let history = useHistory();
  
    function goLogin() {
      history.push("/");
    }
    function goHome(){
      history.push("/home");
    }
    return (
        
            
<ul>
  <li><a class="active" onClick={goHome}>Home</a></li>
  <li><a href="#about">About</a></li>
  <li><a onClick={goLogin}>Log Out</a></li>

</ul>
        
    )
}
