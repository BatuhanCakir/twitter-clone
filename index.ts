
import "reflect-metadata";
import express, { Application,Request,Response } from 'express';
import {createConnection} from "typeorm";

var cookieParser = require('cookie-parser')
import bodyParser from 'body-parser';
const PORT = process.env.PORT || 5000
const path = require("path");

const authRoute = require('./src/api/auth');
const bookmarkRoute = require('./src/api/bookmark');
const profileRoute = require('./src/api/user')
const tweetRoute = require('./src/api/tweet')

if (process.env.NODE_ENV === "production") {
  
  createConnection({
    type: "postgres",
    url: process.env.DATABASE_URL,
    "entities": [
      "../src/entity/**/*.ts"
   ],
  }).then(() => {
    
  
    const app: Application = express();
    app.use(cookieParser());
    app.use(express.json());
    // support parsing of application/json type post data
    app.use(bodyParser.json());
    app.use(express.static(path.join(__dirname, "../client/build")))
  
  
    console.log();
    
    app.use('/api/auth', authRoute.router);
    app.use('/api/user', profileRoute);
    app.use('/api/tweet', tweetRoute);
    app.use('/api/bookmark', bookmarkRoute);
    // register routes

    
    app.get("*", (req: Request, res: Response) => {
      console.log(req.body);
        
      res.sendFile(path.join(__dirname, "../client/build/index.html"));
    });

    

    // start express server
    app.listen(PORT, () => {
      console.log("Listening");
       
    });
  }).catch((data) => {
    console.log(data);
    
  })
} else {

  createConnection().then(() => {
    
    

    // create and setup express app
    const app: Application = express();
    app.use(cookieParser());
    app.use(express.json());
    // support parsing of application/json type post data
    app.use(bodyParser.json());
      
  
    console.log();
    
    app.use('/api/auth', authRoute.router);
    app.use('/api/user', profileRoute);
    app.use('/api/tweet', tweetRoute);
    app.use('/api/bookmark', bookmarkRoute);
    // register routes

    
    app.get("*", (req: Request, res: Response) => {
      console.log(req.body);
        
      res.sendFile(path.join(__dirname, "client/build/index.html"));
    });

    

    // start express server
    app.listen(PORT, () => {
      console.log("Listening");
       
    });
  });
}