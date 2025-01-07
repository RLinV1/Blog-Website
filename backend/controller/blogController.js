import Blog from "../models/blog.js";
import mongoose from "mongoose";
import { createClient } from '@supabase/supabase-js'
import dotenv from "dotenv";
dotenv.config();

const supabase = createClient('https://xmrjvmmrktcddtplyzqa.supabase.co', process.env.SUPABASE_KEY);



export const getBlogs = async (req, res) => {
    try{
        const data = await Blog.find({});

        return res.status(200).json(data);
    } catch(error){

        return res.status(500).json({success: false, message: "An error occurred"});
    }
};

export const getBlogsFromUser = async (req, res) => {
    try{
        const {user_id} = req.params;
        const data = await Blog.find({user_id});
        // console.log(data);
        return res.status(200).json(data);
    } catch(error){

        return res.status(500).json({success: false, message: "An error occurred"});
    }
};

export const getBlog = async (req, res) => {
    const {id} = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(404).json({success: false, message: "Invalid blog id"});
    }
    try{
        const data = await Blog.findById(id);

        return res.status(200).json(data);
    } catch(error){

        return res.status(500).json({success: false, message: "An error occurred"});
    }
};


export const createBlog = async (req, res) => {
    const blog = req.body;
    const token = req.headers.authorization?.split(' ')[1];
    const user = await supabase.auth.getUser(token);
    // console.log(user);

    if (!blog.title || !blog.content){
        return res.status(400).json({success: false, message: "Need all fields"});
    }

    const newBlog = new Blog(blog);
    
    try{
        await newBlog.save();
        return res.status(201).json({success: true, message: "Blog is created"});
    } catch(error){
        console.error("Error in creating blog", error.message);
        return res.status(500).json({ success: false, message: "An error occurred" });
    }
}

export const deleteBlog = async (req, res) => {
    const {id} = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(404).json({success: false, message: "Invalid blog id"});
    }
    const token = req.headers.authorization?.split(' ')[1];
    const user = await supabase.auth.getUser(token);
    // console.log(user.data.user.id);

    
    try{    
        const blog = await Blog.deleteOne({_id: id, user_id: user.data.user.id});
        // console.log(blog)
        if (!blog){
            return res.status(404).json({success: false, message: "Blog not found"});
        } else if (blog.deletedCount == 0){
            return res.status(404).json({success: false, message: "You cannot delete that blog"});
        }
        return res.status(200).json({success: true, message: "Blog is deleted"});
    } catch(error){
        console.error("Error in deleting blog", error.message);
        return res.status(500).json({ success: false, message: "An error occurred" });
    }
};

export const updateBlog = async (req, res) => {

    const {id} = req.params;
    const blog = req.body;

    const token = req.headers.authorization?.split(' ')[1];
    const user = await supabase.auth.getUser(token);
    // console.log(user.data.user.id);

    if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(404).json({success: false, message: "Invalid blog id"});
    }
    try{
        const updatedData = await Blog.findOneAndUpdate({_id: id, user_id: user.data.user.id}, blog, {new: true});
        // console.log(updatedData)
        if (!updatedData){
            return res.status(404).json({success: false, message: "You cannot edit that blog"});

        }
        return res.status(200).json(updatedData);
    } catch(error){
        return res.status(500).json({success: false, message: "An error occurred"});
    }
};



