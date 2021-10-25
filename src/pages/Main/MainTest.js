import React, { useEffect, useState } from "react";
import classes from "./Main.module.css";
import { useParams } from "react-router-dom";
import Loading from "../../componets/Loading/Loading";
import { useQuery } from "@apollo/client";
import { gql } from "@apollo/client";

export default function MainTest() {
const [prev, setPrev] = useState([]);
  const [next, setNext] = useState([]);
  const [gotP, setGotP] = useState(false);
  const [gotN, setGotN] = useState(false);
  let { id } = useParams();
  const [ids, setIds] = useState(parseInt(id));
  let idx = parseInt(ids);
  let back = idx - 1;
  let nexts = idx + 1;
  function loadN() {
    setIds((ids) => ids + 1);
  }
  function loadP() {
    setIds((ids) => ids - 1);
  }
  const BLOGS_QUERY = gql`
    query Blogs($ID: ID!) {
      blog(id: $ID) {
        id
        Heading
        Author
        BlogImg {
          url
        }
        authorImage {
          url
        }
        Content
        Description
        Type
        readTime
      }
    }
  `;

  const { loading, error, data } = useQuery(BLOGS_QUERY, {
    variables: {
      ID: id,
    },
  });
  if (loading)
    return (
      <div className={classes.loading}>
        <Loading />
      </div>
    );
  if (error) return <p>error...</p>;
  const all = data.blog;
  
  return(
  
    <div className={classes.parent}>
    <div className={classes.heading}>{all.Heading}</div>
    <div className={classes.center}>
      <div className centers>
        <div className={classes.img}>
          {all.BlogImg && <img src={all.BlogImg.url} alt="" />}
        </div>

        <div className={classes.mid}>
          <div className={classes.author}>
            <div className={classes.aImage}>
              {all.BlogImg && <img src={all.authorImage.url} alt="" />}
            </div>
            <div className={classes.adetails}>
              <div className={classes.aName}>{all.Author}</div>
              <div className={classes.time}>
                {all.readTime} <span>read</span>
              </div>
            </div>
          </div>
          <div className={classes.types}>{all.Type}</div>
        </div>
      </div>
      <div className={classes.content}>
        <p>{all.Content} </p>
      </div>
    </div>
    <div className={classes.prev}>
      {gotP && (
        <div className={classes.previous}>
          <div className={classes.pImg}>
            {prev.BlogImg && (
              <img src={prev.BlogImg.url} onClick={loadP} alt="" />
            )}
            <div className={classes.over}></div>
          </div>

          <div className={classes.pLink}>
            <button onClick={loadP}>View Previous Blog </button>
          </div>
        </div>
      )}
      {gotN && (
        <div className={classes.next}>
          <div className={classes.pLink}>
            <button onClick={loadN}>View Next Blog </button>
          </div>
          <div className={classes.pImg}>
            {next.BlogImg && (
              <img src={next.BlogImg.url} onClick={loadN} alt="" />
            )}
          </div>
        </div>
      )}
    </div>
    <div className={classes.prev2}>
      {gotP && (
        <div className={classes.previous2}>
          <div className={classes.pImg2}>
            {prev.BlogImg && (
              <img src={prev.BlogImg.url} onClick={loadP} alt="" />
            )}
          </div>
          <div className={classes.pLink2}>
            <button onClick={loadP}>Previous </button>
          </div>
        </div>
      )}
      {gotN && (
        <div className={classes.next2}>
          <div className={classes.pLink2}>
            <button onClick={loadN}>Next </button>
          </div>
          <div className={classes.pImg2}>
            {next.BlogImg && (
              <img src={next.BlogImg.url} onClick={loadN} alt="" />
            )}
          </div>
        </div>
      )}
    </div>
  </div>
 
  )
}
