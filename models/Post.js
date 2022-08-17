import mongoose from 'mongoose';

const PostSchema = new mongoose.Schema({
    author: {
        type: String
    },
    postTitle: {
        type: String,
    },
    linkTitle: {
        type: String,
    },
    postDate: {
        type: String,
    },
    postIntro: {
        type: String,
    },
    thumbnail: {
        type: String,
    },
    //
    //
    sections:[{
        title: String,
        paragraph: String,
        image: String,
        link: String,
    }],
    //
    comments: [{ 
        comment: String,
        date: String,
        author: String, 
    }],
    //
    likes: [{
        username: String
    }],
    //
    conclusion: {
        type: String,
    },
    conclusionTitle: {
        type: String,
    },
    tag: {
        type: String,
    },
    authorUsername: {
        type: String,
    }
})

export const PostModel = mongoose.model("Post", PostSchema);