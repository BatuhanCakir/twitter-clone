"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Tweet_1 = require("./../entity/Tweet");
const express_1 = __importDefault(require("express"));
const typeorm_1 = require("typeorm");
const User_1 = require("../entity/User");
const UserLikedTweet_1 = require("../entity/UserLikedTweet");
const auth = require('./auth').authenticateToken;
const router = express_1.default.Router();
router.post('/post', auth, (req, res) => {
    const userRepository = typeorm_1.getRepository(User_1.User);
    const tweetRepository = typeorm_1.getRepository(Tweet_1.Tweet);
    userRepository.findOne({
        where: {
            id: req.body.id
        }
    }).then((user) => {
        if (user) {
            const newTweet = {
                content: req.body.content,
                likes: 0,
                userId: user.id,
                userName: user.userName
            };
            tweetRepository.save(newTweet);
            return res.status(200).send("success");
        }
        if (user == null) {
            return res.status(400).send("Coudnt create Tweet");
        }
    }).catch((err) => {
        console.log(err);
    });
});
router.post('/getPosts', (req, res) => {
    const tweetRepository = typeorm_1.getRepository(Tweet_1.Tweet);
    const userRepository = typeorm_1.getRepository(User_1.User);
    userRepository.findOne({
        where: {
            userName: req.body.username
        }
    }).then((user) => tweetRepository.find({
        where: {
            userId: user === null || user === void 0 ? void 0 : user.id
        },
        order: { id: "DESC" }
    }).then((Tweets) => {
        console.log(Tweets);
        return res.status(200).send(Tweets);
    }).catch((err) => {
        console.log(err);
    }));
});
router.post('/increaseLikes', auth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const tweetRepository = typeorm_1.getRepository(Tweet_1.Tweet);
    const likedTweets = typeorm_1.getRepository(UserLikedTweet_1.UserLikedTweets);
    const likedTweet = { userId: req.body.userId, tweetId: req.body.tweetId };
    likedTweets.save(likedTweet);
    yield tweetRepository.findOne({
        where: {
            id: req.body.tweetId
        }
    }).then((tweet) => {
        if (tweet) {
            tweet.likes += 1;
            tweetRepository.save(tweet);
        }
        return res.sendStatus(200);
    }).catch((err) => {
        console.log(err);
    });
}));
router.post('/decreaseLikes', auth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const likedTweets = typeorm_1.getRepository(UserLikedTweet_1.UserLikedTweets);
    const tweetRepository = typeorm_1.getRepository(Tweet_1.Tweet);
    likedTweets.findOne({
        where: {
            userId: req.body.userId,
            tweetId: req.body.tweetId
        }
    }).then((tweet) => {
        if (tweet) {
            likedTweets.delete(tweet);
        }
    }).then(() => {
        tweetRepository.findOne({
            where: {
                id: req.body.tweetId
            }
        }).then((tweet) => {
            if (tweet) {
                tweet.likes -= 1;
                tweetRepository.save(tweet);
            }
            return res.sendStatus(200);
        });
    })
        .catch((err) => {
        console.log(err);
    });
}));
router.post('/isLiked', auth, (req, res) => {
    const likedTweets = typeorm_1.getRepository(UserLikedTweet_1.UserLikedTweets);
    likedTweets.findOne({
        where: {
            userId: req.body.userId,
            tweetId: req.body.tweetId
        }
    }).then((tweet) => {
        if (tweet) {
            return res.status(200).send(true);
        }
        else {
            return res.status(200).send(false);
        }
    }).catch((err) => {
        console.log(err);
    });
});
router.post('/getFollowedPost', auth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body);
    const entitityManager = typeorm_1.getManager();
    entitityManager.query(`
      select tweet.*
      from "user" u
      inner join "subscription" as sub 
      on sub."followerId" = u.id 
      inner join tweet 
      on tweet."userId" = sub."userId" 
      where u.id = $1
      order by "created_at" DESC
      `, [req.body.id])
        .then((posts) => {
        console.log(posts);
        if (posts) {
            return res.status(200).send(posts);
        }
        return res.status(200).send([]);
    });
}));
module.exports = router;
//# sourceMappingURL=tweet.js.map