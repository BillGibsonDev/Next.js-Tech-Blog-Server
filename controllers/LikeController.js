import express from 'express';
import mongoose from 'mongoose';
import { PostModel } from "../models/Post.js";

const router = express.Router();

export const findLike = async (req, res) => {
    const { postId } = req.params;
    const { username } = req.body;
  
    
try {
    const like = await PostModel.findOne({ _id: postId, likes: {$elemMatch: { username: username}}})

    if(!like){
        res.json("Not liked");
    } else {
        res.json("Liked!");
    }
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const addLike = async (req, res) => {
    const { postId } = req.params;
    const { username } = req.body;

    try {
        await PostModel.findOneAndUpdate(
        { "_id": postId },
        {
            $push:{
                likes: {
                    username,  
                }
            }
        },
    );
    res.json("Like added!");
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const removeLike = async (req, res) => {
    const { postId } = req.params;
    const { username } = req.body;

    try {
        await PostModel.findOneAndUpdate(
        { "_id": postId },
        {
            $pull:{
                likes: {
                    username,  
                }
            }
        },
    );
    res.json("Like removed!");
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}
