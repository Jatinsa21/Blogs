import React,{useEffect,useState} from 'react';
import classes from "./Main.module.css"
import { useLocation ,Link } from 'react-router-dom'



function Main() {

        const location = useLocation()
        const { pkey,heading,blogImg,desc,author,type,content } = location.state

        return (

            <div className={classes.parent}>
                <div className={classes.noch} ></div>
                <Link className={classes.logoutBtn} to='/'>
                            <img src="https://res.cloudinary.com/ditkixi88/image/upload/v1634018656/transparent_web_interface_icons_icon_logout_icon_5f8bbf9bc2f138_8715297616029940757985_18b1071046.png" />
                        </Link>
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
