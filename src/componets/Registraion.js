import React, { useState ,useEffect }from "react";
import classes from './Registraion.module.css';
import {Link } from "react-router-dom";
import Alert from "./Alert/Alert";

export default function Registration() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [username, setUsername] = useState("");
  const [emailError,setEmailError]=useState("");
  const [usernameError,setUsernameError]=useState("");
  const [passwordError,setPasswordError]=useState("");
  const [confirmError,setConfirmError]=useState("");
  const [sameError,setSameError]=useState("");
  const [done,setDone]=useState("")
  const [mesg ,setMesg]=useState("")
  let userNameBool = false
  let emailBool = false
  let passwordBool=false
  let confirmPassBool= false
  let samePassBool=false

  function validation(){


    if (username === ""){
      userNameBool = false;
      setUsernameError("Username can't be empty")
    }
    else if(username !== ""){
      userNameBool   = true   
       setUsernameError("")
    }
    
    if(email === ""){
      emailBool = false
      setEmailError("Email can't be empty")
    }
    else if(email !== ""){
      emailBool = true

      
      setEmailError("")}
 
      if(password===""){
        passwordBool= false     
        
        setPasswordError("Password  can't be empty")
        
      }
      else if(password!== ""){
        var patt = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/);
        var res = patt.test(password);
        if(res){
          passwordBool= true      
          setPasswordError("")
        }else if(!res){
          
          passwordBool= false  
          setPasswordError("password must be at least 8 characters,1 Upper Case ,1 Lower case and 1 digit");
        }
      


    }

    if(confirmPassword===""){
      confirmPassBool = false

      setConfirmError("Confirm Password can't be empty")

    }
    else if(confirmPassword !== ""){
      confirmPassBool = true
      setConfirmError("")}

    if (password !== confirmPassword) {
      samePassBool = false      
        setSameError("Password and Confirm Password  don't match");
    }
    else if(password === confirmPassword){
      samePassBool = true      

      setSameError("")} 
  }
  useEffect(()=>{
    if(done){
      setTimeout(function(){ setDone(false)}, 4000);

    }
  })
  function handleSubmit() {
  
    if (userNameBool && emailBool && passwordBool && confirmPassBool && samePassBool){
    
      fetch(`${process.env.REACT_APP_HOST}/auth/local/register`, {
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
          if(result.jwt){
            setMesg("Done!")
            setDone("Go back to log in page")
            setUsername("")
            setPassword("")
            setConfirmPassword("")
            setEmail("")
          }else{
          setMesg("Error")
          setDone(result.message[0].messages[0].message)            
          }
         
        })
        .catch(e=>{
            console.log(e)
         
        })
    }
  }
  
  
  return (
    <div className={classes.parentReg} >
      <div className={classes.alert}>
          {done?<Alert alert={done} Mesg={mesg}/>:null}
      </div>
      
      <div className={classes.formReg}>
        <img  src={"https://res.cloudinary.com/ditkixi88/image/upload/v1633754999/icons8_new_view_80_d0ff370d68.png"} />
        <div className={classes.internal}>
          <div className={classes.username}>
            <label className={classes.lable}>Username </label>
            <input className={classes.input} type="text"  value={username} onChange={e=>setUsername(e.target.value)} className={classes.input} />
            <span className={classes.error}>{usernameError}</span>
          </div>
          <div className={classes.email}>
            <label className={classes.lable}>Email</label>
            <input type="email" value={email} autoComplete="new-password"  className={classes.input}  onChange={e=>setEmail(e.target.value)}/>
            <span className={classes.error}>{emailError}</span>
          </div>
          <div className={classes.password}>
            <label className={classes.lable}>Enter Password</label>
            <input type="password" autoComplete="new-password"  value={password}  className={classes.input}onChange={e=>setPassword(e.target.value)}/>
            <span className={classes.error}>{passwordError}</span>
            <span className={classes.error}>{sameError}</span>
          </div>
          <div className={classes.passwordCheck}>
            <label className={classes.lable}> Confirm Password </label>
            <input type="password" value={confirmPassword} onChange={e=>setConfirmPassword(e.target.value)} 
              className={classes.input}/>
              <span className={classes.error}>{confirmError}</span>
              <span className={classes.error}>{sameError}</span>
          </div>
          <div className={classes.submit}>
            <button type="submit"  onClick={()=>{
              validation()
              handleSubmit()
            }} > Signup </button>
              
          </div>
          <div className={classes.register}>
            <span className={classes.span}> For Signin page</span><Link className={classes.forgotLink} to='/'>Click here</Link>
          </div>
        </div>
      </div>
    </div>
  );
}