import React,{useEffect,useState} from 'react';
import classes from "./Main.module.css"
import { useLocation ,Link ,useParams} from 'react-router-dom'
import Loading from '../../componets/Loading/Loading';



function Main() {
         const[all,setAll]= useState([])
         const [loading,setLoading] = useState(false)
        let {id} = useParams();
        useEffect(()=>{
            setLoading(true)
            fetch(`${process.env.REACT_APP_HOST}/blogs/${id}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
          })
            .then(result => result.json())
            .then(result => {
                setLoading(false)
    
               setAll(result)
            })
            .catch(e=>{
                setLoading(false)
                console.log(e)
            })
          
        },[])
           
           return loading? <div className={classes.loading} ><Loading/></div>:<div className={classes.parent}>
            {/* //     <div className={classes.noch} >
            //     <Link className={classes.logoutBtn} to='/'>
            //                 <img src="https://res.cloudinary.com/ditkixi88/image/upload/v1634018656/transparent_web_interface_icons_icon_logout_icon_5f8bbf9bc2f138_8715297616029940757985_18b1071046.png" />
            //             </Link></div> */}
                <div className={classes.heading}>
                   {all.Heading}
                </div> 
                <div className={classes.center}>
                    <div className centers>
                 <div className={classes.img}>
                     {/* {console.log(all.BlogImg.url)} */}
                   {all.BlogImg&& <img src={all.BlogImg.url}/>}
                 
                </div>
                {/* <div className={classes.desc}>
                    {desc}
                </div> */}
                <div className={classes.nameType}>
                    <div className={classes.name}>
                        {all.Author}
                    </div>
                    <div className={classes.type}>
                        {all.Type}
                    </div>
                </div> 
               <div className={classes.time}>
                   {all.readTime} <span>Read</span>
               </div> 
</div>
                <div className={classes.content}> 
                    <p>
                       { all.Content} </p>
                    
                </div>
               </div>
                

               
    </div>
    
}

export default Main;
