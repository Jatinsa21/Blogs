import React, { useEffect, useState } from "react";
import classes from "./Main.module.css";
import { useParams } from "react-router-dom";
import Loading from "../../componets/Loading/Loading";

function Main() {
  const [all, setAll] = useState([]);
  const [loading, setLoading] = useState(false);
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

  useEffect(() => {
    setLoading(true);
    fetch(`${process.env.REACT_APP_HOST}/blogs/${ids}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((result) => result.json())
      .then((result) => {
        setLoading(false);

        setAll(result);
      })
      .catch((e) => {
        setLoading(false);
        console.log(e);
      });
  }, [ids]);

  useEffect(() => {
    setLoading(true);
    setGotP(true);
    fetch(`${process.env.REACT_APP_HOST}/blogs/${back}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((result) => result.json())
      .then((result) => {
        setLoading(false);

        setPrev(result);
      })
      .catch((e) => {
        setLoading(false);
        setGotP(false);
      });
  }, [back, ids]);

  useEffect(() => {
    setLoading(true);
    fetch(`${process.env.REACT_APP_HOST}/blogs/${nexts}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((result) => result.json())
      .then((result) => {
        setLoading(false);
        setGotN(true);
        setNext(result);
      })
      .catch((e) => {
        setLoading(false);
        setGotN(false);
      });
  }, [nexts, ids]);

  return loading ? (
    <div className={classes.loading}>
      <Loading />
    </div>
  ) : (
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
  );
}

export default Main;
