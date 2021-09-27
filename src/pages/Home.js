import React,{useEffect,useState} from 'react'
import Header from '../componets/Header/Header'
import Slider from '../componets/Slider/Slider'
import Tiles from '../componets/Tiles/Tiles'
import "./Home.css"

export const Home = () => {
    const [blog,setBlog] = useState([])
    useEffect(()=>{
        fetch(`http://localhost:1337/blogs`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      })
        .then(result => result.json())
        .then(result => {
           setBlog(result)
        })
        .catch(e=>{
            console.log(e)
        })
      
    },[])
    return (
        <div>
            {console.log(blog)}
            <Header />
            <Slider data={blog}/>
            <Tiles/>         
        </div>
    )
}
