import React,{useEffect,useState} from 'react'
import Block from '../componets/Block/Block'
import Header from '../componets/Header/Header'
import Slider from '../componets/Slider/Slider'
// http://localhost:1337 
import "./Home.css"

export const Home = () => {
    const [blog,setBlog] = useState([])
    useEffect(()=>{
        fetch(`${process.env.REACT_APP_HOST}/blogs`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      })
        .then(result => result.json())
        .then(result => {
           setBlog(result)
           console.log(result)
        })
        .catch(e=>{
            console.log(e)
        })
      
    },[])
    return (
        <div>
          
            <Header />
            <Slider data={blog}/>
            <Block data={blog}/>
                  
        </div>
    )
}
