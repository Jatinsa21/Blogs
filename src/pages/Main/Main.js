import React,{useEffect,useState} from 'react';
import classes from "./Main.module.css"

function Main({key}) {
    
const id = 1;
const[all,setAll]= useState([])

useEffect(()=>{
    fetch(`${process.env.REACT_APP_HOST}/blogs`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  })
    .then(result => result.json())
    .then(result => {
       
  
       setAll(result)
    })
    .catch(e=>{
        console.log(e)
    })
  
},[])
console.log(key)

    return (
        <div>
            {all.filter(el => el.id === key).map(ell => (
               <div> {ell.Heading}
               {ell.Blogimg}</div>



             ))}
    </div>
    )
}

export default Main
