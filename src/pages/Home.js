import React,{useEffect,useState} from 'react'
import classes from "./Home.module.css"
import { useHistory ,Link} from "react-router-dom";

export const Home = () => {
    const [blog,setBlog] = useState([])
    const[all,setAll]= useState([blog])

    function setFilterTech(){
        setAll(blog.filter(el =>el.Type == "Technology"))
    }
    function setFilterMarcket(){
        setAll(blog.filter(el =>el.Type == "Marketing"))
    }
    function setFilterAll(){
        setAll(blog)
    }
    useEffect(()=>{
        fetch(`${process.env.REACT_APP_HOST}/blogs`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      })
        .then(result => result.json())
        .then(result => {
           setBlog(result)
           setAll(result)
        })
        .catch(e=>{
            console.log(e)
        })
      
    },[])
    return (
        <>{console.log(blog)}
            {console.log(all)}
            <div className={classes.parent} >
                <div className={classes.noch}>
                    <div className={classes.type}>
                        <div className={classes.button}>
                            <button onClick={setFilterAll} >All</button>
                        </div>
                        <div className={classes.button}>
                            <button onClick={setFilterTech}>Technology</button>
                        </div>
                        <div className={classes.button}>
                            <button onClick={setFilterMarcket} >Marketing</button>
                        </div>
                    </div>
                    <div className={classes.logout}>
                        <Link className={classes.logoutBtn} to='/'>
                            <img src="https://res.cloudinary.com/ditkixi88/image/upload/v1633936110/logout_f31dfc5571.png" />
                        </Link>
                    </div>
                </div>
                <div className={classes.search}>
                    <input className={classes.input} placeholder="Search blog here" ></input>
                </div>
                <div className={classes.data}>
                    <div className={classes.cards}>
                        {all.map(ell => (
                            <div className={classes.card}>
                            <div className={classes.img}>
                                {ell.BlogImg?<img src={ell.BlogImg.url}/>:null}
                            </div>
                            <div className={classes.detalis}>
                              <div className={classes.head}>{ell.Heading}</div>
                              <div className={classes.description}>{ell.Description}</div>
                              <div className={classes.open}><button>Read full blog</button></div>
                              <div className={classes.mid}>
                                <div className={classes.author}>{ell.Author}</div>
                                <div className={classes.types}>{ell.Type}</div>
                              </div>
                              <div className={classes.time}>{ell.readTime} <span>read</span></div>

                            </div>
                            </div>
                         ))}
                    </div>

                </div>
            </div>













               {/* {blog.filter(el =>el.Type == "Technology").map(ell => (
                 <div className="card">
                 <div className="content">
                 <div className="img">
                 {ell.BlogImg?<img src={`${process.env.REACT_APP_HOST}+${ell.BlogImg.url}`}/>:null}
                 </div>
                 <div className="details">
                     <div className="name">{ell.Heading}</div>
                     <div className="type">{ell.Type}</div>
                 </div>
                 </div>
                 </div>   
                 ))} */}


    </>
    )
}
