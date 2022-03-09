import mongoose from 'mongoose';

const PostSchema = new mongoose.Schema({
    author: {
        type: String
    },
    title: {
        type: String,
    },
    linkTitle: {
        type: String,
    },
    date: {
        type: String,
    },
    thumbnail: {
        type: String,
    },
    intro: {
        type: String,
    },
    sections:[{
        title: String,
        paragraph: String,
        image: String,
        link: String,
    }],
    tag: {
        type: String,
    },
    type: {
        type: String,
    }
})

export const PostModel = mongoose.model("Post", PostSchema);