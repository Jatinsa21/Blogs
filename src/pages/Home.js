import React,{useEffect,useState} from 'react'
import classes from "./Home.module.css"
import { useHistory ,Link} from "react-router-dom";
import Loading from '../componets/Loading/Loading';


export const Home = () => {
    const [loading,setLoading] = useState(false)
   
    const[all,setAll]= useState([])
    const [searchInput, setSearchInput]=useState("")
    const [filterName,setFilterName] = useState('All')
    const filters = filterName === 'All' ? all : all.filter(el =>el.Type == filterName)
    const history = useHistory();


    const filterSearch = filters.filter(el=>el.Heading?.toLowerCase().includes(searchInput?.toLowerCase()) )

    useEffect(()=>{
        setLoading(true)
        fetch(`${process.env.REACT_APP_HOST}/blogs`, {
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
    const menu = [
        {
            name:"All"
        },{
            name:"Technology"
        },{
            name:"Marketing"
        }
    ]
                return loading? <div className={classes.loading} ><Loading/></div>:<div className={classes.parent} >
                <div className={classes.noch}>
                    <div className={classes.type}>
                        {
                            menu.map((ele) => (
                                <button className={`${classes.btn1} ${filterName === ele.name && classes.btnActive }`} onClick={()=>setFilterName(ele.name)} >{ele.name}</button>
                            ))}
                        
                    </div>
                    <div className={classes.logout}>
                        <Link className={classes.logoutBtn} to='/'>
                            <img src="https://res.cloudinary.com/ditkixi88/image/upload/v1634018656/transparent_web_interface_icons_icon_logout_icon_5f8bbf9bc2f138_8715297616029940757985_18b1071046.png" />
                        </Link>
                    </div>
                </div>
                <div className={classes.search}>
                    <input className={classes.input} placeholder="Search blog here" onChange={e=>setSearchInput(e.target.value)}  value={searchInput} ></input>
                </div>
                <div className={classes.data}>
                    
                        {filterSearch.map((ell) => (
                            
                            ell ? (<>
                            <div className={classes.card}>
                             <div className={classes.img}><Link className={classes.image}
                                     to={{
                                        pathname: `/main/${ell.id}`,
                                      }}
                                    >
                             
                                 {ell.BlogImg?<img src={ell.BlogImg.url } width="800" height="350"/>:null}</Link>
                             </div>
                             <div className={classes.detalis}>
                               <div className={classes.head}>
                               <Link className={classes.hLink}
                                    to={{
                                        pathname: `/main/${ell.id}`,
                                      }}
                                    >
                                    
                                    {ell.Heading}</Link></div>
                               <div className={classes.description}><p>{ell.Description}</p></div>
                               <div className={classes.bottom}>
                               <div className={classes.open}>
                               <Link
                                     to={{
                                        pathname: `/main/${ell.id}`,
                                      }}
                                    >
                                    Reed full Blog
                                    </Link>
                                </div>
                               <div className={classes.mid}>
                                 <div className={classes.author}>{ell.Author}</div>
                                 <div className={classes.types}>{ell.Type}</div>
                               </div>
                               <div className={classes.time}>{ell.readTime} <span>read</span></div>
                                 </div>
                             </div>
                             </div>
                            </>):null
 
                        )
                        )}
                    

                <div className={classes.end}>
                    No more Blogs Found
                </div>
                </div>
            </div>

    
    
}
