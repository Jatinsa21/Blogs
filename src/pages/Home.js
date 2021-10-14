import React,{useEffect,useState} from 'react'
import classes from "./Home.module.css"
import { useHistory ,Link} from "react-router-dom";
import Main from './Main/Main';

export const Home = () => {
    // const [blog,setBlog] = useState([])
    const[all,setAll]= useState([])
    const [searchInput, setSearchInput]=useState("")
    const [filterName,setFilterName] = useState('All')
    const filters = filterName === 'All' ? all : all.filter(el =>el.Type == filterName)
    const history = useHistory();
  
    function goMain(key) {
    //   history.push("/main"),key;
    history.push({ 
        pathname: '/register',
        state: {
            response:key 
          } 
       });
    }
    // const [key,setKey] = useState("")
    // function setFilterTech(){
    //     setAll(blog.filter(el =>el.Type == "Technology"))
    // }
    // function setFilterMarcket(){
    //     setAll(blog.filter(el =>el.Type == "Marketing"))
    // }
    //  function setFilterAll(){
    //     setAll(blog)
    // }
    // function setFilter(name){
    //     if (name==="All"){
    //         setAll(blog)
    //     }
    //     else {
    //         setAll(blog.filter(el =>el.Type == name))
    //     }
    // }

    const filterSearch = filters.filter(el=>el.Heading?.toLowerCase().includes(searchInput?.toLowerCase()) )

    useEffect(()=>{
        fetch(`${process.env.REACT_APP_HOST}/blogs`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      })
        .then(result => result.json())
        .then(result => {
            console.log(result)
        //    setBlog(result)
           setAll(result)
        })
        .catch(e=>{
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

    return (
        <>
            
            <div className={classes.parent} >
                <div className={classes.noch}>
                    <div className={classes.type}>
                        {
                            menu.map((ele) => (
                                <button className={`${classes.btn1} ${filterName === ele.name && classes.btnActive }`} onClick={()=>setFilterName(ele.name)} >{ele.name}</button>
                            ))}

                            {/* <button className={classes.btn1} onClick={setFilterAll} >All</button>
                        
                            <button className={classes.btn2} onClick={setFilterTech}>Technology</button>
        
                            <button className={classes.btn3}  onClick={setFilterMarcket} >Marketing</button> */}
                        
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
                             <div className={classes.img}>
                                 {ell.BlogImg?<img src={ell.BlogImg.url}/>:null}
                             </div>
                             <div className={classes.detalis}>
                               <div className={classes.head}>{ell.Heading}</div>
                               <div className={classes.description}><p>{ell.Description}</p></div>
                               <div className={classes.bottom}>
                               <div className={classes.open}>
                                   <button type="submit" onClick={()=> {goMain(ell.id)}} >Read full blog</button>
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

    </>
    )
}
