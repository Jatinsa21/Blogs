import React,{useEffect,useState} from 'react'
import classes from "./Home.module.css"
import { useHistory ,Link} from "react-router-dom";

export const Home = () => {
    const [blog,setBlog] = useState([])
    const[all,setAll]= useState([blog])
    const [searchInput, setSearchInput]=useState("")
    

    function setFilterTech(){
        setAll(blog.filter(el =>el.Type == "Technology"))
    }
    function setFilterMarcket(){
        setAll(blog.filter(el =>el.Type == "Marketing"))
    }
     function setFilterAll(){
        setAll(blog)
    }

    const filterSearch = all.filter(el=>el.Heading?.toLowerCase().includes(searchInput?.toLowerCase()) )
   
    useEffect(()=>{
        fetch(`${process.env.REACT_APP_HOST}/blogs`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      })
        .then(result => result.json())
        .then(result => {
            console.log(result)
           setBlog(result)
           setAll(result)
        })
        .catch(e=>{
            console.log(e)
        })
      
    },[])

    return (
        <>
            
            <div className={classes.parent} >
                <div className={classes.noch}>
                    <div className={classes.type}>
                        <div className={classes.button}>
                            <button onClick={setFilterAll} >All</button>
                        </div>
                        <div className={classes.button1} >
                            <button onClick={setFilterTech}>Technology</button>
                        </div>
                        <div className={classes.button}>
                            <button onClick={setFilterMarcket} >Marketing</button>
                        </div>
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
                    <div className={classes.cards}>
                        {filterSearch.map((ell) => (
                            
                            ell ? (<>
                            <div className={classes.card}>
                             <div className={classes.img}>
                                 {ell.BlogImg?<img src={ell.BlogImg.url}/>:null}
                             </div>
                             <div className={classes.detalis}>
                               <div className={classes.head}>{ell.Heading}</div>
                               <div className={classes.description}><p>{ell.Description}</p></div>
                               <div className={classes.bottom}>
                               <div className={classes.open}><button>Read full blog</button></div>
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
                    </div>

                </div>
                {/* <div className={classes.end}>
                    No more Results
                </div> */}
            </div>

    </>
    )
}
