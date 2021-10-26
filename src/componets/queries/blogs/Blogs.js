import {gql} from "@apollo/client";

const BLOGS_QUERY = gql`
  query Blogs {
    blogs {id,
      Heading,
      Author,
      BlogImg{url},
      authorImage{url},
      Content,
      Description,
      Type,
      readTime
    }
    menus{
      name
    }
  }
  
`;

export default BLOGS_QUERY;
