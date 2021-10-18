import React,{useEffect,useState} from 'react';
import classes from "./Main.module.css"
import { useLocation ,Link ,useParams} from 'react-router-dom'
import Loading from '../../componets/Loading/Loading';



function Main() {
         const[all,setAll]= useState([])
         const [loading,setLoading] = useState(false)
         const[prev, setPrev] = useState([])
         const[next, setNext] = useState([])
         const[gotP , setGotP] = useState(false)
         const[gotN , setGotN] = useState(false)
        let {id} = useParams();
        const [ids,setIds]=useState(parseInt(id))
        let idx = parseInt(ids)
        let back = idx-1;
        let nexts = idx+1;

        function loadN(){
            setIds(ids=>ids+1)
            

            
        }
        function loadP(){
            setIds(ids=>ids-1)
            
        }
        useEffect(()=>{
            setLoading(true)
            fetch(`${process.env.REACT_APP_HOST}/blogs/${ids}`, {
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
          
        },[ids])

        
            
            useEffect(()=>{
                if(ids==9){
                    
                    setGotP(false)
                }
                else{
                setLoading(true)
                setGotP(true)
                fetch(`${process.env.REACT_APP_HOST}/blogs/${back}`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
              })
                .then(result => result.json())
                .then(result => {
                    setLoading(false)
        
                   setPrev(result)
                   
                })
                .catch(e=>{
                    setLoading(false)
                    console.log(e)
                })
            }
            },[back],[ids])
        



        useEffect(()=>{
            if(ids==16){
               
                setGotN(false)
            }
            else{
            setLoading(true)
            fetch(`${process.env.REACT_APP_HOST}/blogs/${nexts}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
          })
            .then(result => result.json())
            .then(result => {
                setLoading(false)
                setGotN(true)
               setNext(result)
               console.log(result)
            })
            .catch(e=>{
                setLoading(false)
                console.log(e)
            })}
          
        },[nexts],[ids])
           
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
                <div className={classes.prev}>
                   {gotP && <div className={classes.previous}>
                        <div className={classes.pImg}>
                        {prev.BlogImg&& <img src={prev.BlogImg.url} height="100px"/>}
                        </div>
                        <div className={classes.pLink}>
                        <button onClick={loadP}>
                            View Previous Blog  </button>
                        </div>
                    </div>}
                    {gotN &&  <div className={classes.next}>
                        <div className={classes.pLink}>
                        <button onClick={loadN}>
                            View Next Blog  </button>
                        </div>
                        <div className={classes.pImg}>
                        {next.BlogImg&& <img src={next.BlogImg.url} height="100px"/>}
                        </div>
                    </div>}
                </div>

               
    </div>
    
}

export default Main;
