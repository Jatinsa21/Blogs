import React from "react";
import classes from "./Main.module.css";
import { useParams, Link } from "react-router-dom";
import Loading from "../../componets/Loading/Loading";
import { useQuery } from "@apollo/client";
import { gql } from "@apollo/client";

export default function Main() {
  // const [prev, setPrev] = useState([]);
  // const [next, setNext] = useState([]);
  // const [gotP, setGotP] = useState(false);
  // const [gotN, setGotN] = useState(false);
  let { id } = useParams();
  // const [ids, setIds] = useState(parseInt(id));
  // let idx = parseInt(ids);
  // let back = idx - 1;
  // let nexts = idx + 1;
  // function loadN() {
  //   setIds((ids) => ids + 1);
  // }
  // function loadP() {
  //   setIds((ids) => ids - 1);
  // }
  const BLOGS_QUERY = gql`
    query Blogs($ID: ID!, $PID: ID!, $NID: ID!) {
      blogs(where: { id: [$ID, $PID, $NID] }) {
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
      PID: parseInt(id) - 1,
      NID: parseInt(id) + 1,
    },
  });

  if (loading)
    return (
      <div className={classes.loading}>
        <Loading />
      </div>
    );
  if (error) return <p>error...</p>;
  const all = data.blogs.filter((el) => el.id === id)[0];
  const prev = data.blogs.filter((elp) => {
    return parseInt(elp.id) === parseInt(id) - 1;
  })[0];
  const next = data.blogs.filter((eln) => {
    return parseInt(eln.id) === parseInt(id) + 1;
  })[0];

  return (
    <div className={classes.parent}>
      <div className={classes.heading}>{all.Heading}</div>
      <div className={classes.center}>
        <div >
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
        {prev && (
          <Link to={{ pathname: `/main/${id - 1}` }}>
            <div className={classes.previous}>
              <div className={classes.pImg}>
                {prev.BlogImg && <img src={prev.BlogImg.url} alt="" />}
                <div className={classes.over}></div>
              </div>

              <div className={classes.pLink}>
                {" "}
                <button> View Previous Blog</button>
              </div>
            </div>
          </Link>
        )}
        {next && (
          <Link className={classes.end} to={{ pathname: `/main/${parseInt(id) + 1}` }}>
            <div className={classes.next}>
              <div className={classes.pLink}>
                <button>View Next Blog </button>
              </div>
              <div className={classes.pImg}>
                {next.BlogImg && <img src={next.BlogImg.url} alt="" />}
              </div>
            </div>
          </Link>
        )}
      </div>
      <div className={classes.prev2}>
        {prev && (
      
            <div className={classes.previous2}>
              <div className={classes.pImg2}>
                {prev.BlogImg && <img src={prev.BlogImg.url} alt="" />}
              </div>
              <div className={classes.pLink2}>
              <Link to={{ pathname: `/main/${id - 1}` }}>
                <button>Previous </button>
                </Link>
              </div>
            </div>
         
        )}
        {next && (
          <div className={classes.next2}>
              <div className={classes.pLink2}>
              <Link to={{ pathname: `/main/${parseInt(id) + 1}` }}>
                <button>Next </button>
          </Link>
              </div>
              <div className={classes.pImg2}>
                {next.BlogImg && <img src={next.BlogImg.url} alt="" />}
              </div>
            </div>
        )}
      </div>
    </div>
  );
}
