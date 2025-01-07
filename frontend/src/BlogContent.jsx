import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { DarkThemeToggle, Flowbite } from "flowbite-react";
import { useNavigate } from "react-router-dom";
import { RiArrowGoBackFill } from "react-icons/ri";
import { useUser } from "@supabase/auth-helpers-react";

const BlogContent = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [blog, setBlog] = useState({});
  const user = useUser();

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

      {blog && (
        <div className="w-full h-fit flex flex-col items-center gap-4 justify-center bg-[#678dc5] dark:bg-gray-700">
          <div className="text-6xl flex dark:text-white text-black w-full justify-center items-center text-center">
            {blog.title}
          </div>
          {user && user.user_metadata && (
            <div className="p-2 text-2xl dark:text-white ">Created By {user.user_metadata.username}</div>
          )}

          <div className="bg-[#678dc5] dark:bg-gray-700">
            {blog.image && (
              <img
                src={blog.image}
                alt="blog image"
                className="max-w-md max-h-md"
              />
            )}
          </div>
          <div className="dark:text-white text-black p-8 max-w-[75%] sm:text-sm md:text-base lg:text-xl  ">
            {blog.content &&
              blog.content.split("\n").map((paragraph, index) => {
                return (
                  <p key={index} className="p-1">
                    {paragraph}
                  </p>
                );
              })}
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogContent;
