import { useEffect, useState } from "react";
import { Appbar, BlogTile } from "../components";
import axios from "axios";
import { URL } from "../constants/constants";
import { Link } from "react-router-dom";

interface getBlogsResponse {
  title: string,
  content: string,
  id: string,
  author: {
    name: string
  }
}

function Blogs() {
  const [blogs, setBlogs] = useState<getBlogsResponse[] | []>([]);
  useEffect(() => {
    const getBlogs = async () => {
      axios.get(`${URL}/api/v1/blog/bulk`).then((response) => {
        setBlogs(response.data.data);
      });
    };
    getBlogs();
  }, []);

  return (
    <div>
      <Appbar />
      {/* All the blogs */}
      <div className="flex flex-col py-6 px-2 w-1/2 min-w-[480px] mx-auto">
        {blogs.map((blog) => {
          return (
            <Link key={blog.id} to={`/blog/${blog.id}`}>
              <BlogTile
                name={blog.author.name}
                date={"saf"}
                title={blog.title}
                content={blog.content}
              />
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default Blogs;
