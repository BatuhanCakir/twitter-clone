"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const typeorm_1 = require("typeorm");
var cookieParser = require('cookie-parser');
const body_parser_1 = __importDefault(require("body-parser"));
const PORT = process.env.PORT || 5000;
const path = require("path");
const authRoute = require('./src/api/auth');
const bookmarkRoute = require('./src/api/bookmark');
const profileRoute = require('./src/api/user');
const tweetRoute = require('./src/api/tweet');
if (process.env.NODE_ENV === "production") {
    typeorm_1.createConnection({
        type: "postgres",
        url: process.env.DATABASE_URL
    }).then(() => {
        const app = express_1.default();
        app.use(cookieParser());
        app.use(express_1.default.json());
        app.use(body_parser_1.default.json());
        app.use(express_1.default.static(path.join(__dirname, "client/build")));
        console.log();
        app.use('/api/auth', authRoute.router);
        app.use('/api/user', profileRoute);
        app.use('/api/tweet', tweetRoute);
        app.use('/api/bookmark', bookmarkRoute);
        app.get("*", (req, res) => {
            console.log(req.body);
            res.sendFile(path.join(__dirname, "client/build/index.html"));
        });
        app.listen(PORT, () => {
            console.log("Listening");
        });
    });
}
else {
    typeorm_1.createConnection().then(() => {
        const app = express_1.default();
        app.use(cookieParser());
        app.use(express_1.default.json());
        app.use(body_parser_1.default.json());
        console.log();
        app.use('/api/auth', authRoute.router);
        app.use('/api/user', profileRoute);
        app.use('/api/tweet', tweetRoute);
        app.use('/api/bookmark', bookmarkRoute);
        app.get("*", (req, res) => {
            console.log(req.body);
            res.sendFile(path.join(__dirname, "client/build/index.html"));
        });
        app.listen(PORT, () => {
            console.log("Listening");
        });
    });
}
//# sourceMappingURL=index.js.map