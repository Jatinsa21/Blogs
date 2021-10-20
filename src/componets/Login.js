import React, { useState ,useEffect } from "react";
import classes from './Login.module.css'
import { useHistory ,Link} from "react-router-dom";
import Alert from "./Alert/Alert";

export default function Login() {
  const [done,setDone]=useState("")
  useEffect(()=>{
    if(done){
      setTimeout(function(){ setDone(false)}, 3000);

    }
  })
    let history = useHistory();
  
    function goHome() {
      history.push("/home");
    }
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
    let jwt = null;
  function handleSubmit(){

    fetch(`${process.env.REACT_APP_HOST}/auth/local`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
         identifier:email,
         password:password
         
        }),
      })
        .then(result => result.json())
        .then(result => {
            if(result.jwt){
              localStorage.setItem("key",JSON.stringify(result.jwt))
              jwt =  result.jwt
              if(jwt){
                goHome()
              }  
        }else{
          setDone("Invalid Details" )
        }
        })
        
        .catch(e=>{
            console.log(e)
        })
      }
  return (
    <div className={classes.parentLogin}>
      <div className={classes.alert}>
        {done?<Alert alert={done} Mesg="Error!"/>:null}</div>
        <div className={classes.formlogin}  >
           <img  src={"https://res.cloudinary.com/ditkixi88/image/upload/v1633754999/icons8_new_view_80_d0ff370d68.png"}/>
           <div className={classes.internal}>

           <div className={classes.email}>
               <label className={classes.label}>Email</label>
               <input className={classes.input}  value={email} onChange={e=>setEmail(e.target.value)} type="email" />
           </div>
           <div className={classes.password}>
               <label className={classes.label}>Password</label>
               <input className={classes.input} value={password} onChange={e=>setPassword(e.target.value)} type="password" />
            <div className={classes.forgot}>
               <Link className={classes.forgotLink}  Link to='/forgot' > Forgot password?</Link>
            </div>
            </div>
            <div className={classes.submit}>
                <button type="submit"  onClick={handleSubmit} > Sigin </button>
            </div>
            <div className={classes.register}>
               <span className={classes.span}> To registration?</span><Link className={classes.forgotLink} to='/registration'>Click here</Link>
              </div>
           </div>
             
        </div>
    </div>
  );
}