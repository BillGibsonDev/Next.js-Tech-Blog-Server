import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from "cookie-parser";
import { getPost } from './controllers/PostController';

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());
app.use(cookieParser());

import routes from './routes/routes.js';
import { createTokens, validateToken } from "./JWT.js";

const host = process.env.HOST || '0.0.0.0';
const port = process.env.PORT || 5000;

app.use('/', routes);

app.get('/*', (req, res, next) => {
  fs.readFile(indexPath, 'utf8', (err, htmlData) => {
    if (err) {
      console.error('Error during file reading', err);
      return res.status(404).end()
    }
    
    const postId = req.query.id;
    const post = getPost(postId);
    if(!post) return res.status(404).send("Post not found");

    htmlData = htmlData.replace(
      "<title>Tech Blog</title>",
      `<title>${post.postTitle}</title>`
    )
    .replace('__META_OG_TITLE__', post.postTitle)
    .replace('__META_OG_DESCRIPTION__', post.content.slice(0, 100))
    .replace('__META_DESCRIPTION__', post.content.slice(0, 100))
    .replace('__META_OG_IMAGE__', post.thumbnail)
    
    return res.send(htmlData);
  });
});

mongoose.connect(   
  process.env.NODE_ENV_MONGO_KEY, {
    useNewUrlParser: true,
  }
);

app.listen(port, host, () => {
  console.log(`Server active on ${port}`);
}); 