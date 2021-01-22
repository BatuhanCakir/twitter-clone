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
exports.User = void 0;
const Bookmarked_1 = require("./Bookmarked");
const Tweet_1 = require("./Tweet");
const typeorm_1 = require("typeorm");
const UserLikedTweet_1 = require("./UserLikedTweet");
const Comment_1 = require("./Comment");
let User = class User {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], User.prototype, "id", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], User.prototype, "firstName", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], User.prototype, "lastName", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], User.prototype, "userName", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], User.prototype, "bio", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], User.prototype, "age", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], User.prototype, "hashedPassword", void 0);
__decorate([
    typeorm_1.CreateDateColumn({ name: 'created_at' }),
    __metadata("design:type", Date)
], User.prototype, "created_at", void 0);
__decorate([
    typeorm_1.OneToMany(() => Tweet_1.Tweet, tweet => tweet.user),
    __metadata("design:type", Array)
], User.prototype, "tweets", void 0);
__decorate([
    typeorm_1.OneToMany(() => UserLikedTweet_1.UserLikedTweets, likedTweet => likedTweet.user),
    __metadata("design:type", Array)
], User.prototype, "likedTweet", void 0);
__decorate([
    typeorm_1.OneToMany(() => Bookmarked_1.Bookmarked, bookmarkedTweet => bookmarkedTweet.user),
    __metadata("design:type", Array)
], User.prototype, "bookmarkedTweet", void 0);
__decorate([
    typeorm_1.OneToMany(() => Comment_1.Comment, comment => comment.user),
    __metadata("design:type", Array)
], User.prototype, "comments", void 0);
User = __decorate([
    typeorm_1.Entity()
], User);
exports.User = User;
//# sourceMappingURL=User.js.map