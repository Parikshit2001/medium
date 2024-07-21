import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { URL } from "../constants/constants";
import { Appbar, Loading } from "../components";

function Blog() {
  const params = useParams();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  useEffect(() => {
    const getBlog = async () => {
      axios.get(`${URL}/api/v1/blog/${params.id}`).then((response) => {
        const data = response.data.blogData;
        setTitle(data.title);
        setContent(data.content);
      });
    };
    getBlog();
  }, []);
  return (
    <div>
      <Appbar />
      {title ? (<div className="grid grid-cols-12 h-full py-24 min-w-[480px]">
        {/* Left Part */}
        <div className="col-span-8 flex flex-col space-y-1 px-8 ml-10 h-full">
          {/* Title */}
          <h1 className="font-bold text-6xl">{title}</h1>
          {/* Date Posted */}
          <h2 className="text-gray-500">Posted on Aug 24, 2023</h2>
          {/* Content/Article */}
          <p className="py-2">{content}</p>
        </div>
        {/* Right Part */}
        <div className="w-1/4 flex flex-col space-y-3 fixed right-10">
          {/* Author */}
          <div>
            <p className="font-semibold">Author</p>
          </div>
          {/* Author Details */}
          <div className="flex items-center space-x-3">
            {/* Circle */}
            <div>
              <div className="bg-gray-300 rounded-full w-6 h-6"></div>
            </div>
            {/* Details */}
            <div>
              {/* Nickname of author */}
              <h1 className="font-bold text-3xl">Jokester</h1>
              {/* Description of author */}
              <h2 className="text-gray-500">
                Master of mirth, purveyor of puns and the funniest person in the
                kingdom
              </h2>
            </div>
          </div>
        </div>
      </div>) : <Loading />}
    </div>
  );
}

export default Blog;
