import { useUser } from "@supabase/auth-helpers-react";
import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BlogCard from "./BlogCard";
import { RiArrowGoBackFill } from "react-icons/ri";
import { DarkThemeToggle, Flowbite } from "flowbite-react";

const AllBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const user = useUser();
  const navigate = useNavigate();

  const getBlogs = async () => {
    try {
      // console.log(user);
      // console.log(user.id);
      const response = await fetch(`https://blog-website-ss4m.onrender.com/api/blogs/`);
      const data = await response.json();
      setBlogs(data);
    } catch (error) {
      console.log(error);
    }
  };

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading data
    setTimeout(() => setIsLoading(false), 250);
  }, []);

 useEffect(() => {
    if (!user) {
      setIsLoading(true); // Wait for auth state to resolve
    } else {
      setIsLoading(false);
      getBlogs();
    }
 }, [user]);

  if (isLoading) return <div>Loading...</div>;


  return (
    <div className="flex flex-col w-full h-screen items-center justify-between  bg-[#678dc5] dark:bg-gray-700">
      <div className="flex w-full justify-between">
        <div className=" bg-[#678dc5] dark:bg-gray-700 p-4">
          <RiArrowGoBackFill
            size={30}
            onClick={() => {
              navigate("/");
            }}
            className=" rounded-lg cursor-pointer text-black hover:bg-[#557bb4] ring-0 focus:ring-0 shadow-none dark:ring-0 dark:shadow-none hover:dark:bg-gray-800"
          />
        </div>
        <Flowbite>
          <div className="bg-[#678dc5] dark:bg-gray-700">
            <nav className="p-4">
              <DarkThemeToggle className="text-black hover:bg-[#557bb4] ring-0 focus:ring-0 shadow-none dark:ring-0 dark:shadow-none hover:dark:bg-gray-800" />
            </nav>
          </div>
        </Flowbite>
      </div>
      <div className=" w-full p-4 bg-[#678dc5] dark:bg-gray-700 flex-grow ">
        <div className="grid grid-cols-4 w-full gap-8 p-4 bg-[#678dc5] dark:bg-gray-700">
          {blogs &&
            blogs.map((blog) => {
              return (
                <div key={blog._id} className="">
                  <BlogCard
                    title={blog.title}
                    content={blog.content}
                    id={blog._id}
                    getBlogs={getBlogs}
                    image={blog.image}
                    isGallery={false}
                  />
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default AllBlogs;
