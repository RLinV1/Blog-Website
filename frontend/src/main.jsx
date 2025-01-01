import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import BlogContent from './BlogContent.jsx'
import { BrowserRouter, Routes, Route } from "react-router";

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="blog/:id" element={<BlogContent />} />
    
    </Routes>
  </BrowserRouter>,
)
