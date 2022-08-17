import express from 'express';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import cookieParser from "cookie-parser";
import { UserModel } from "../models/Users.js"
import { createTokens, validateToken } from "../JWT.js";

const router = express.Router();

export const createUser = async (req, res) => {
    const { username, password, userRole, email, joinDate } = req.body;

  const user = await UserModel.findOne({username: username });
  if (user === username) res.status(400).json({ error: "Username already exsists!" });

  const mail = await UserModel.findOne({email: email });
  if (mail === email) res.status(400).json({ error: "Email already used!" });

      bcrypt.hash(password, 10).then((hash) => {
        UserModel.create({
          username: username,
          email: email,
          password: hash,
          role: userRole,
          joinDate: joinDate,
        })
          .then(() => {
            res.json("USER REGISTERED");
          })
          .catch((err) => {
            if (err) {
              res.status(400).json({ error: err });
            }
          });
      });
  };


  export const loginUser = async (req, res) =>{
    const { username, password } = req.body;

    const user = await UserModel.findOne({username: username });
  
    if (!user) res.status(400).json({ error: "Wrong Username or Password!" });
  
    const userPassword = user.password;
    bcrypt.compare(password, userPassword).then((match) => {
      if (!match) {
        res
          .status(400)
          .json({ error: "Wrong Username or Password!" });
      } else {
        const accessToken = createTokens(user);

        res.cookie("access-token", accessToken, {
          maxAge: 60 * 60 * 24 * 30 * 1000,
          httpOnly: true,
        });
        
        res.json("LOGGED IN");
      }
    });
  };

  export const getRole = async (req, res) =>{
    const { username, password } = req.body;

    const user = await UserModel.findOne({username: username });
  
    if (!user) res.status(400).json({ error: "User Doesn't Exist" });
  
    const userPassword = user.password;
    bcrypt.compare(password, userPassword).then((match) => {
      if (!match) {
        res
          .status(400)
          .json({ error: "Wrong Username or Password!" });
      } else {
        res.json(user.role);
      }
    });
  };

  export const confirmAdmin = async (req, res) =>{
    const { role } = req.body;
    const buf1 = role;
    const buf2 = process.env.NODE_ENV_ADMIN_SECRET;
    if( buf1 === buf2){
      res.json("Role Confirmed");
    } else {
      res.json("Does not match")
    }
  };

  export const confirmRole = async (req, res) =>{
    const { role } = req.body;
    const buf1 = role;
    const buf2 = process.env.NODE_ENV_ADMIN_SECRET;
    const buf3 = process.env.NODE_ENV_CREATOR_SECRET;
    const buf4 = process.env.NODE_ENV_USER_SECRET;
    if( buf1 === buf2 || buf3 || buf4){
      res.json("Role Confirmed");
    } else {
      res.json("Does not match")
    }
  };

   export const getDate = async (req, res) =>{
    const { username, password } = req.body;

    const user = await UserModel.findOne({username: username });
  
    if (!user) res.status(400).json({ error: "User Doesn't Exist" });
  
    const userPassword = user.password;
    bcrypt.compare(password, userPassword).then((match) => {
      if (!match) {
        res
          .status(400)
          .json({ error: "Wrong Username or Password!" });
      } else {
        res.json(user.joinDate);
      }
    });
  };

  export const deleteAccount = async (req, res) =>{
    const { username, password } = req.body;

    const user = await UserModel.findOne({username: username });
  
    if (!user) res.status(400).json({ error: "User Doesn't Exist" });
  
    const userPassword = user.password;
    bcrypt.compare(password, userPassword).then((match) => {
      if (!match) {
        res
          .status(400)
          .json({ error: "Wrong Username or Password!" });
      } else {
        UserModel.findOneAndDelete({username: username });
        res.json("Account Deleted")
      }
    });
  };