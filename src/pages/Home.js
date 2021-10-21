import React, { useEffect, useState } from "react";
import classes from "./Home.module.css";
import { Link } from "react-router-dom";
import Loading from "../componets/Loading/Loading";

export const Home = () => {
  const [loading, setLoading] = useState(false);

  const [all, setAll] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [filterName, setFilterName] = useState("All");
  const filters =
    filterName === "All" ? all : all.filter((el) => el.Type === filterName);
  const [currentPage, setCurrentPage] = useState(1);
  const renderPerPage = useState(3);
  const [pageNumbers, setPageNumbers] = useState([]);
  const filterSearch = filters.filter((el) =>
    el.Heading?.toLowerCase().includes(searchInput?.toLowerCase())
  );
  function handleClick(event) {
    setCurrentPage(event.target.id);
  }

  useEffect(() => {
    setLoading(true);
    fetch(`${process.env.REACT_APP_HOST}/blogs`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((result) => result.json())
      .then((result) => {
        setLoading(false);
        setAll(result);

        for (let i = 1; i <= Math.ceil(result.length / renderPerPage[0]); i++) {
          setPageNumbers((prev) => [...prev, i]);
        }
      })
      .catch((e) => {
        setLoading(false);
        console.log(e);
      });
  }, []);
  function previous() {
    setCurrentPage(parseInt(currentPage) - 1);
  }
  function next() {
    setCurrentPage(parseInt(currentPage) + 1);
  }

  const indexOfLastBlog = currentPage * renderPerPage[0];
  const indexOfFirstBlog = indexOfLastBlog - renderPerPage[0];
  const current = filterSearch.slice(indexOfFirstBlog, indexOfLastBlog);

  const renderBlogs = current.map((ell, index) => {
    return ell ? (
      <>
        <div key={index} className={classes.card}>
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
      </>
    ) : null;
  });
  const renderPageNumbers = pageNumbers.map((number) => {
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
  const menu = [
    {
      name: "All",
    },
    {
      name: "Technology",
    },
    {
      name: "Marketing",
    },
  ];
  return loading ? (
    <div className={classes.loading}>
      <Loading />
    </div>
  ) : (
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
            <img
              src="https://res.cloudinary.com/ditkixi88/image/upload/v1634537161/Icons8_Windows_8_User_Interface_Logout_5bf970826f.ico"
              alt=""
            />
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
            {" "}
            {currentPage !== 1 && (
              <button className={classes.jump} onClick={previous}>
                Previous page
              </button>
            )}
          </div>
          <div> {renderPageNumbers} </div>
          <div>
            {" "}
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
};
