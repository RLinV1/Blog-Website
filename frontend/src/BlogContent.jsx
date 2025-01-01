import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { DarkThemeToggle, Flowbite } from "flowbite-react";
import { useNavigate } from "react-router-dom";
import { RiArrowGoBackFill } from "react-icons/ri";

const BlogContent = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [blog, setBlog] = React.useState({});

  const getBlog = async () => {
    const response = await fetch(`http://localhost:5000/api/blogs/${id}`);
    const data = await response.json();
    setBlog(data);
  };

  useEffect(() => {
    getBlog();
  }, []);

  return (
    <div className="bg-[#678dc5] dark:bg-gray-700 h-[100vh] w-full ">
      <div className="flex w-full justify-between">
        <div className=" bg-[#678dc5] dark:bg-gray-700 p-4">
          <RiArrowGoBackFill size={30} onClick={() => {navigate("/")}} className=" rounded-lg cursor-pointer text-black hover:bg-[#557bb4] ring-0 focus:ring-0 shadow-none dark:ring-0 dark:shadow-none hover:dark:bg-gray-800"/>
        </div>
        <Flowbite>
          <div className="bg-[#678dc5] dark:bg-gray-700">
            <nav className="p-4">
              <DarkThemeToggle className="text-black hover:bg-[#557bb4] ring-0 focus:ring-0 shadow-none dark:ring-0 dark:shadow-none hover:dark:bg-gray-800" />
            </nav>
          </div>
        </Flowbite>
      </div>
      
      {blog && (
        <div className="flex flex-col items-center gap-8 justify-center">
          <div className="text-6xl flex dark:text-white text-black w-full justify-center">
            {blog.title}
          </div>
          <p className="dark:text-white text-black">{blog.content}</p>
        </div>
      )}
    </div>
  );
};

export default BlogContent;
