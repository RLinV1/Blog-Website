import { useEffect, useState } from "react";

import Navbar from "./Navbar";
import BlogCard from "./BlogCard";

function App() {

  const [blogs, setBlogs] = useState([]);

  const  getBlogs = async () => {
    try{
      const response = await fetch('http://localhost:5000/api/blogs')
      const data = await response.json();
      setBlogs(data);
    } catch (error) {
      console.log(error)
    }
    
  }

  useEffect(() => {
    getBlogs();
  }, []);

  return (
      <div className="flex flex-col items-center justify-center bg-[#678dc5] dark:bg-gray-700">
        <Navbar  getBlogs={getBlogs}/>
        <div className="my-4 h-[100vh] w-full p-4 ">
          <div className="grid grid-cols-4 w-full gap-8 p-4">
            {blogs && blogs.map(blog => {
              return (

              
                <div key={blog._id} className="">
                  <BlogCard title={blog.title} content={blog.content} id={blog._id} getBlogs={getBlogs}/>              
                </div>
              )
            })}
          </div>

        
          
        </div>
      </div>
  )
}

export default App
