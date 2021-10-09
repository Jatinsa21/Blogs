import React from 'react'
import "./Block.css"

export default function Block({data}) {
    return (
        <div className="mainBlock">
            <div className="inner">
                <div className="blocks">
                {data.map(ell => (
                  <div className="bBlock">
                  <div className="blockData">
                    <div className="bImg">
                    {/* {ell.BlogImg?<img src={`${process.env.REACT_APP_HOST}${ell.BlogImg.formats.large.url}`}/>:null} */}
                    {ell.BlogImg?<img src={ell.BlogImg.formats.large.url}/>:null}
                    </div>
                    <div className="bDetails">
                      <div className="bName">{ell.Heading}</div>
                      <div className="bType">{ell.Type}</div>
                      <div className="bType">{ell.Author}</div>
                    </div>
                    </div>
                    </div>   
                    ))} 

                </div>
            </div>

        </div>
    )
}
