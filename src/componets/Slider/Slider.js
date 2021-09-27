import React from 'react'
import './Slider.css'

function Slider({data}) {
    return (
       
          <div className="container">
            <input type="radio" name="dot" id="one"/>
            <input type="radio" name="dot" id="two"/>
            <div className="main-card">
              <div className="cards">
              {data.filter(el => el.id< 4).map(ell => (
                  <div className="card">
                  <div className="content">
                    <div className="img">
                    {ell.BlogImg?<img src={'http://localhost:1337'+ell.BlogImg.url}/>:null}
                    </div>
                    <div className="details">
                      <div className="name">{ell.Heading}</div>
                      <div className="type">{ell.Type}</div>
                    </div>
                    </div>
                    </div>   
                    ))} 


              </div>
              <div className="cards">
              {data.filter(el =>3< el.id< 7).map(ell => (
    <div className="card">
     <div className="content">
       <div className="img">
       {ell.BlogImg?<img src={'http://localhost:1337'+ell.BlogImg.url}/>:null}
       </div>
       <div className="details">
         <div className="name">{ell.Heading}</div>
         <div className="type">{ell.Type}</div>
       </div>
       </div>
       </div>   
       ))} 

              </div>
            </div>
            <div className="button">
              <label for="one" className=" active one"></label>
              <label for="two" className="two"></label>
            </div>
          </div>
        
        
    )
}

export default Slider
