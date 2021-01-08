import {Entity,  ManyToOne, PrimaryColumn, JoinColumn} from "typeorm";
import { Tweet } from "./Tweet";
import { User } from "./User";

@Entity()
export class UserLikedTweets {

    @PrimaryColumn()
    userId: number;
    
    @PrimaryColumn()
    tweetId: number;
    
    @ManyToOne(() => User, user => user.likedTweet, {
        onDelete:'CASCADE'
    })
    @JoinColumn({name: "userId"})
        user: User;
    
    @ManyToOne(() => Tweet, tweet => tweet.likedUser, {
       onDelete:'CASCADE'
    })
    @JoinColumn({ name: 'tweetId' })
        tweet: Tweet;
  

}