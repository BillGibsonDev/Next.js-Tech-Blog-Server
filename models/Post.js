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
    content: {
        type: String,
    },
    thumbnail: {
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