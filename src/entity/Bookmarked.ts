import {Entity,Column, CreateDateColumn, PrimaryGeneratedColumn, JoinColumn, ManyToOne} from "typeorm";
import { Tweet } from "./Tweet";
import { User } from "./User";

@Entity()
export class Bookmarked {
   @PrimaryGeneratedColumn()
    id: number;
   @Column()
    userId: number;

    @Column()
    tweetId: number;
   
  
  @ManyToOne(() => User, user => user.bookmarkedTweet, {
        onDelete:'CASCADE'
    })
    @JoinColumn({name: "userId"})
        user: User;
    
    @ManyToOne(() => Tweet, tweet => tweet.bookmarkedUser, {
       onDelete:'CASCADE'
    })
    @JoinColumn({ name: 'tweetId' })
        tweet: Tweet;
  
  @CreateDateColumn()
  createdAt: Date;

    
}
