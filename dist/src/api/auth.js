"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateToken = void 0;
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const typeorm_1 = require("typeorm");
const User_1 = require("../entity/User");
require('dotenv').config();
router.post('/register', (req, res) => {
    const userRepository = typeorm_1.getRepository(User_1.User);
    userRepository.findOne({
        where: [
            { userName: req.body.username },
            { email: req.body.email }
        ]
    }).then((user) => {
        if (user)
            return res.status(404).send({ message: "User already exits" });
        if (user == null) {
            const hashedPassword = bcrypt.hashSync(req.body.password, 10);
            const newUser = new User_1.User();
            newUser.firstName = req.body.firstName;
            newUser.lastName = req.body.lastName;
            newUser.email = req.body.email;
            newUser.age = req.body.age;
            newUser.hashedPassword = hashedPassword;
            newUser.userName = req.body.username;
            userRepository.save(newUser);
            const JwtInput = {
                username: req.body.username,
                email: req.body.email
            };
            const accessToken = generateAccessToken(JwtInput);
            res.cookie('token', accessToken, { httpOnly: true });
            return res.sendStatus(200);
        }
    }).catch((err) => {
        console.log(err);
    });
});
router.post('/login', (req, res) => {
    const userRepository = typeorm_1.getRepository(User_1.User);
    userRepository.findOne({
        where: {
            email: req.body.email
        }
    }).then((user) => {
        if (user) {
            if (bcrypt.compareSync(req.body.password, user.hashedPassword)) {
                const JwtInput = {
                    username: user.userName,
                    email: user.email
                };
                const accessToken = generateAccessToken(JwtInput);
                const refreshToken = generateRefreshToken(JwtInput);
                res.cookie('token', accessToken, { httpOnly: true });
                res.cookie('refreshToken', refreshToken, { httpOnly: true });
                return res.sendStatus(200);
            }
            else {
                return res.status(401).send({ error: "WrongPassword" });
            }
        }
        else {
            return res.status(404).send({ error: "User not found" });
        }
    }).catch((err) => {
        res.send(err);
    });
});
function generateAccessToken(user) {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '5min' });
}
function generateRefreshToken(user) {
    return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET);
}
function authenticateToken(req, res, next) {
    if (req.cookies) {
        const accessToken = req.cookies.token;
        if (accessToken == null)
            return res.status(401).send({ error: "No Access" });
        jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
            if (err)
                return authenticateRefreshToken(req, res, next);
            res.locals.user = user;
            res.user = user;
            return next();
        });
    }
    else {
        return res.status(401).send({ error: "No Access" });
    }
}
exports.authenticateToken = authenticateToken;
function authenticateRefreshToken(req, res, next) {
    if (req.cookies) {
        const refreshToken = req.cookies.refreshToken;
        if (refreshToken == null)
            return res.status(401).send("No Access");
        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
            if (err)
                return res.status(401).send(err);
            const JwtInput = {
                username: user.username,
                email: user.email
            };
            const accessToken = generateAccessToken(JwtInput);
            res.locals.user = user;
            res.cookie('token', accessToken, { httpOnly: true });
            next();
        });
    }
}
module.exports = {
    router: router,
    authenticateToken: authenticateToken
};
//# sourceMappingURL=auth.js.map