import React from "react";
import BLOGS_QUERY from "../queries/blogs/Blogs";
import { useQuery } from "@apollo/client";

const Nav = () => {
     const {
        loading,
        error,
        data: blogDetail,
    } = useQuery(BLOGS_QUERY);
    if (loading) return <p>Loading...</p>;
    if (error) return <p>error...</p>;


    const blog = blogDetail.blogDetail;
    console.log();
  return (
    <div>
      <h1>Hi</h1>
    </div>
  );
};

export default Nav;