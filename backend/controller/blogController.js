import Blog from "../models/blog.js";
import mongoose from "mongoose";


export const getBlogs = async (req, res) => {
    try{
        const data = await Blog.find({});

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
    try{
        const blog = await Blog.findByIdAndDelete(req.params.id);
        if (!blog){
            return res.status(404).json({success: false, message: "Blog not found"});
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

    if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(404).json({success: false, message: "Invalid blog id"});
    }
    try{
        const updatedData = await Blog.findByIdAndUpdate(id, blog, {new: true});
        return res.status(200).json(updatedData);
    } catch(error){
        return res.status(500).json({success: false, message: "An error occurred"});
    }
};



