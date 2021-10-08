import React, { useState } from "react";
import classes from './Forgot.module.css'
import { useHistory ,Link} from "react-router-dom";

export default function Forgot() {
    const [email, setEmail] = useState("");
    
    function handleSubmit(){

        fetch(`http://localhost:1337/auth/forgot-password`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
             
                email:email,
                url:
                  'http:/localhost:1337/admin/plugins/users-permissions/auth/reset-password',
            }),
          })
          .then(response => {
            // Handle success.
            console.log('Your user received an email');
          })
            .catch(e=>{
                console.log(e)
            })
          }
 return(
     <>
     <div className={classes.parent}>
         <div className={classes.form}>
             <img  src="http://localhost:1337/uploads/icons8_new_view_80_f7a424678b.png"/>
             <div  className={classes.internal}>
             <p className={classes.head}>Reset Password</p>
             <div className={classes.left}>
                <p className={classes.mesg}> Enter your email to reset your password.</p>
                <div className={classes.email}>
                <label className={classes.label}>Email</label>
                <input className={classes.input}  value={email} onChange={e=>setEmail(e.target.value)} type="email"/>
                 </div>
            </div>
            <div className={classes.submit}>
                <button type="submit" onClick={handleSubmit}  > Send Reset link </button>
            </div>
            <div className={classes.login}>
                <span>Return to Sign-in page?</span> <Link to='/'>Click here</Link>
            </div>
            </div>
         </div>

     </div>


     </>
 )


}
