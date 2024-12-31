import { useEffect, useState } from "react";

function App() {
  useEffect(() => {
    document.body.classList.toggle("dark", darkMode);
  }, [darkMode]);

  return (
      <div className="h-full w-full bg-gray-100 dark:bg-gray-800">
        This color
      </div>


  
  )
}

export default App
