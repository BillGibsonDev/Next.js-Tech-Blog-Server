import express from 'express';
import mongoose from 'mongoose';
import { PostModel } from "../models/Post.js";

const router = express.Router();

export const createComment = async (req, res) => {
    const { postId } = req.params;
    const { comment, date, author } = req.body;

    try {
        await PostModel.findOneAndUpdate({ _id: postId },
            {
            '$push': {
                'comments': {  
                    comment, 
                    date, 
                    author
                }
            }
        })
        res.status(201).json("Comment Created");
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
    
}

export const deleteComment = async (req, res) => {
    const { postId, commentId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(commentId)) return res.status(404).send(`No comment with id: ${commentId}`);

    await PostModel.findOneAndUpdate(
        { _id: postId },
        { $pull: { 'comments': { _id: commentId } } },
        { multi: true }
    )
    res.json("Comment Deleted");
    
}