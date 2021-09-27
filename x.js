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