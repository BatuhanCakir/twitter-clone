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
const Subscription_1 = require("./../entity/Subscription");
const express_1 = __importDefault(require("express"));
const typeorm_1 = require("typeorm");
const User_1 = require("../entity/User");
const auth = require('./auth').authenticateToken;
const router = express_1.default.Router();
router.get('/', auth, (req, res) => {
    const userRepository = typeorm_1.getRepository(User_1.User);
    userRepository.findOne({
        where: {
            userName: res.locals.user.username
        }
    }).then((user) => {
        if (user) {
            const clientUser = {
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                userName: user.userName,
                email: user.email,
                age: user.age,
                created_at: user.created_at,
            };
            return res.status(200).send(clientUser);
        }
        if (user == null) {
            return res.status(401).send("No User found");
        }
    }).catch((err) => {
        console.log(err);
        console.log(req);
    });
});
function getId(username) {
    return __awaiter(this, void 0, void 0, function* () {
        const userRepository = typeorm_1.getRepository(User_1.User);
        const user = yield userRepository.findOne({
            where: {
                userName: username
            }
        });
        if (user) {
            return user.id;
        }
        return null;
    });
}
router.post('/getId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = yield getId(req.body.username);
    if (userId) {
        return res.status(200).send(String(userId));
    }
    if (userId == null) {
        return res.status(401).send("No User found");
    }
}));
router.post('/getFollower', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = yield getId(req.body.username);
    const subscriptionRepository = typeorm_1.getRepository(Subscription_1.Subscription);
    subscriptionRepository.find({
        where: {
            userId: id
        }
    }).then((follower) => {
        if (follower)
            return res.status(200).send(follower);
        return res.status(400).send("error");
    });
}));
router.post('/follow', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body);
    const id = yield getId(req.body.username);
    const subscriptionRepository = typeorm_1.getRepository(Subscription_1.Subscription);
    const sub = {
        userId: id,
        followerId: req.body.followerId
    };
    subscriptionRepository.save(sub);
    return res.sendStatus(200);
}));
router.post('/getNotFollowedUser', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body);
    const userRepository = typeorm_1.getRepository(User_1.User);
    userRepository.find({
        take: 4,
        where: `id != ${req.body.id}`
    }).then((data) => {
        return res.status(200).send(data);
    });
}));
router.post('/unfollow', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = yield getId(req.body.username);
    const subscriptionRepository = typeorm_1.getRepository(Subscription_1.Subscription);
    const sub = {
        userId: id,
        followerId: req.body.followerId
    };
    subscriptionRepository.delete(sub);
    return res.sendStatus(200);
}));
router.post('/getFollowed', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = yield getId(req.body.username);
    const subscriptionRepository = typeorm_1.getRepository(Subscription_1.Subscription);
    subscriptionRepository.find({
        where: {
            followerId: id
        }
    }).then((followed) => {
        if (followed)
            return res.status(200).send(followed);
        return res.status(400).send("error");
    });
}));
module.exports = router;
//# sourceMappingURL=user.js.map