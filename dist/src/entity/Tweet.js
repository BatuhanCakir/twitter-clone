"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tweet = void 0;
const Bookmarked_1 = require("./Bookmarked");
const Comment_1 = require("./Comment");
const User_1 = require("./User");
const typeorm_1 = require("typeorm");
const UserLikedTweet_1 = require("./UserLikedTweet");
let Tweet = class Tweet {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Tweet.prototype, "id", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Tweet.prototype, "content", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", Number)
], Tweet.prototype, "retweets", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], Tweet.prototype, "likes", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], Tweet.prototype, "userId", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], Tweet.prototype, "userName", void 0);
__decorate([
    typeorm_1.ManyToOne(() => User_1.User, user => user.tweets),
    __metadata("design:type", User_1.User)
], Tweet.prototype, "user", void 0);
__decorate([
    typeorm_1.OneToMany(() => UserLikedTweet_1.UserLikedTweets, likedUser => likedUser.tweet),
    __metadata("design:type", UserLikedTweet_1.UserLikedTweets)
], Tweet.prototype, "likedUser", void 0);
__decorate([
    typeorm_1.OneToMany(() => Bookmarked_1.Bookmarked, bookmarked => bookmarked.tweet),
    __metadata("design:type", Bookmarked_1.Bookmarked)
], Tweet.prototype, "bookmarkedUser", void 0);
__decorate([
    typeorm_1.OneToMany(() => Comment_1.Comment, comment => comment.tweet),
    __metadata("design:type", Array)
], Tweet.prototype, "comments", void 0);
__decorate([
    typeorm_1.CreateDateColumn({ name: 'created_at' }),
    __metadata("design:type", Date)
], Tweet.prototype, "created_at", void 0);
Tweet = __decorate([
    typeorm_1.Entity()
], Tweet);
exports.Tweet = Tweet;
//# sourceMappingURL=Tweet.js.map