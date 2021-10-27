import React, { useState } from "react";
import classes from "./Home.module.css";
import { Link } from "react-router-dom";
import Loading from "../../componets/Loading/Loading";
import BLOGS_QUERY from "../../componets/queries/blogs/Blogs";
import { useQuery } from "@apollo/client";

export default function Home() {
  const [searchInput, setSearchInput] = useState("");
  const [filterName, setFilterName] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const renderPerPage = useState(process.env.REACT_APP_ARTICLEPERPAGE);
  let pageNumbers = [];

  const { loading, error, data } = useQuery(BLOGS_QUERY);
  if (loading)
    return (
      <div className={classes.loading}>
        <Loading />
      </div>
    );

  if (error) return <p>{JSON.stringify(error)}</p>;
  const all = data.blogs;

  const menu = data.menus;

  const filters =
    filterName === "All" ? all : all.filter((el) => el.Type === filterName);

  const filterSearch = filters.filter((el) =>
    el.Heading?.toLowerCase().includes(searchInput?.toLowerCase())
  );
  function handleClick(event) {
    setCurrentPage(parseInt(event.target.id));
  }
  function previous() {
    setCurrentPage(parseInt(currentPage) - 1);
  }
  function next() {
    setCurrentPage(parseInt(currentPage) + 1);
  }
  const indexOfLastBlog = currentPage * renderPerPage[0];
  const indexOfFirstBlog = indexOfLastBlog - renderPerPage[0];
  const current = filterSearch.slice(indexOfFirstBlog, indexOfLastBlog);
  for (let i = 1; i <= Math.ceil(filterSearch.length / renderPerPage[0]); i++) {
    pageNumbers.push(i);
  }
  const renderBlogs = current.map((ell, index) => {
    return ell ? (
      <div key={index}>
        <div className={classes.card}>
          <div className={classes.img}>
            <Link
              className={classes.image}
              to={{ pathname: `/main/${ell.id}` }}
            >
              {ell.BlogImg ? <img src={ell.BlogImg.url} alt="" /> : null}
            </Link>
          </div>
          <div className={classes.detalis}>
            <div className={classes.head}>
              <Link
                className={classes.hLink}
                to={{ pathname: `/main/${ell.id}` }}
              >
                {ell.Heading}
              </Link>
            </div>
            <div className={classes.description}>
              <p>{ell.Description}</p>
            </div>
            <div className={classes.bottom}>
              <div className={classes.open}>
                <Link
                  className={classes.oLink}
                  to={{ pathname: `/main/${ell.id}` }}
                >
                  Read full Blog
                </Link>
              </div>
              <div className={classes.mid}>
                <div className={classes.author}>
                  <div className={classes.aImage}>
                    <img src={ell.authorImage.url} alt="" />
                  </div>
                  <div className={classes.adetails}>
                    <div className={classes.aName}>{ell.Author}</div>
                    <div className={classes.time}>
                      {ell.readTime} <span>read</span>
                    </div>
                  </div>
                </div>
                <div className={classes.types}>{ell.Type}</div>
              </div>
            </div>
          </div>
        </div>
        <div className={classes.line}>
          <hr></hr>
        </div>
      </div>
    ) : null;
  });
  const renderPageNumbers = pageNumbers.map((numberr) => {
    let number = parseInt(numberr);

    return (
      <button
        className={`${
          number === parseInt(currentPage) ? classes.btnActives : classes.btnNot
        }`}
        key={parseInt(number)}
        id={parseInt(number)}
        onClick={handleClick}
      >
        {parseInt(number)}
      </button>
    );
  });

  function removeJwt() {
    localStorage.clear();
  }
  return (
    <div className={classes.parent}>
      <div className={classes.noch}>
        <div className={classes.type}>
          {menu.map((ele, index) => (
            <button
              key={index}
              className={`${filterName === ele.name && classes.btnActive}`}
              onClick={() => setFilterName(ele.name)}
            >
              {ele.name}
            </button>
          ))}
        </div>
        <div className={classes.type2}>
          {" "}
          <select
            onChange={(e) => {
              const selected = e.target.value;
              setFilterName(selected);
            }}
          >
            {" "}
            {menu.map((ele, index) => (
              <option key={index} value={ele.name}>
                {ele.name}
              </option>
            ))}
          </select>
        </div>
        <div className={classes.logout} onClick={removeJwt}>
          <Link className={classes.logoutBtn} to="/">
            <img src={process.env.REACT_APP_LOGOUT} alt="" />
          </Link>
        </div>
      </div>
      <div className={classes.search}>
        <input
          className={classes.input}
          placeholder="Search blog here"
          onChange={(e) => setSearchInput(e.target.value)}
          value={searchInput}
        ></input>
      </div>
      <div className={classes.data}>
        {renderBlogs}
        <div className={classes.pages}>
          <div>
            {currentPage !== 1 ? (
              <button className={classes.jump} onClick={previous}>
                Previous page
              </button>
            ) : null}
          </div>
          <div> {renderPageNumbers} </div>
          <div>
            {currentPage !== pageNumbers.length && (
              <button className={classes.jump} onClick={next}>
                Next page
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
