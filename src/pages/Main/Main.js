import React,{useEffect,useState} from 'react';
import classes from "./Main.module.css"
import { useLocation } from 'react-router-dom'



function Main() {

        const location = useLocation()
        const { pkey,heading,blogImg,desc,author,type,content } = location.state

        return (
            <div className={classes.parent}>
                <div className={classes.heading}>
                   {heading}
                </div> 
                <div className={classes.desc}>
                    {desc}
                </div>
                <div className={classes.nameType}>
                    <div className={classes.name}>
                        {author}
                    </div>
                    <div className={classes.type}>
                        {type}
                    </div>
                </div> 
                <div className={classes.img}>
                    <img src={blogImg}/>
                </div>
                <div className={classes.content}> 
                    <p>
                        {content} </p>
                    
                </div>
                

               
    </div>
    )
}

export default Main
