
import "reflect-metadata";
import express, { Application,Request,Response } from 'express';
import {createConnection} from "typeorm";

var cookieParser = require('cookie-parser')
import bodyParser from 'body-parser';
const PORT = process.env.PORT || 5000
const path = require("path");

const authRoute = require('./api/auth');
const bookmarkRoute = require('./api/bookmark');
const profileRoute = require('./api/user')
const tweetRoute = require('./api/tweet')



createConnection().then(() => {
    
    

    // create and setup express app
    const app: Application = express();
    app.use(cookieParser());
    app.use(express.json());
    // support parsing of application/json type post data
    app.use(bodyParser.json());
      
    app.use(express.static(path.join(__dirname,"../twitter-frontent/build")))
    
    app.use('/api/auth', authRoute.router);
    app.use('/api/user', profileRoute);
    app.use('/api/tweet',tweetRoute);
    app.use('/api/bookmark',bookmarkRoute);
        // register routes

    
    app.get("*", (req: Request, res: Response) => {
        console.log(req.body);
        
      res.sendFile(path.join(__dirname, "../twitter-frontend/build/index.html"));
    });

    

    // start express server
    app.listen(PORT, () => {
      console.log("Listening");
       
    });
});