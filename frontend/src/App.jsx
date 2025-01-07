import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import BlogCard from "./BlogCard";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { useNavigate } from "react-router-dom";

function App() {
  const navigate = useNavigate();
  const supabase = useSupabaseClient();

  const [blogs, setBlogs] = useState([]);
  const [session, setSession] = useState(null);
  const user = useUser();

  const getBlogs = async () => {
    try {
      const response = await fetch(
        `https://blog-website-ss4m.onrender.com/getUserBlogs/${user.id}`
      );
      const data = await response.json();
      setBlogs(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (user) {
      getBlogs();
    } else {
      navigate("/");
    }
  }, [user]);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading data
    setTimeout(() => setIsLoading(false), 250);
  }, []);

  return isLoading ? (
    <div className=" flex justify-center items-center dark:text-white text-4xl w-full h-screen bg-[#678dc5] dark:bg-gray-700">
      Loading...
    </div>
  ) : (
    <div className="flex flex-col w-full h-screen items-center justify-between  bg-[#678dc5] dark:bg-gray-700">
      <Navbar getBlogs={getBlogs} />
      <div className=" w-full p-4 bg-[#678dc5] dark:bg-gray-700 flex-grow ">
        {user && user.user_metadata && (
          <div className="flex w-full justify-center text-4xl dark:text-white pb-4">
            Welcome {user.user_metadata.username}
          </div>
        )}
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
                    isGallery={true}
                  />
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default App;
