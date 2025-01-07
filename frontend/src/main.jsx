import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import BlogContent from './BlogContent.jsx'
import { BrowserRouter, Routes, Route } from "react-router";
import {SessionContextProvider} from '@supabase/auth-helpers-react'
import { createClient } from '@supabase/supabase-js'
import Login from "./Login.jsx"
import AllBlogs from './AllBlogs.jsx';
const supabaseUrl = 'https://xmrjvmmrktcddtplyzqa.supabase.co'
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)


createRoot(document.getElementById('root')).render(
  <SessionContextProvider supabaseClient={supabase}>
    <BrowserRouter>

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<App />} />
        <Route path="/blogs" element={<AllBlogs />} />
        <Route path="blog/:id" element={<BlogContent />} />
      
      </Routes>
    </BrowserRouter>
  </ SessionContextProvider>
,
)
