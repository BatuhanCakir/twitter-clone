import { Bookmarked } from './Bookmarked';

import { Tweet } from './Tweet';
import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany} from "typeorm";
import { UserLikedTweets } from './UserLikedTweet';
import { Comment } from './Comment';

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstName: string;

    @Column()
    lastName: string;
  
    @Column()
    userName: string;

    @Column({nullable:true})
    bio: string;

    @Column()
    email: string;

    @Column()
    age: number;

    @Column()
    hashedPassword: string;

    @CreateDateColumn({ name: 'created_at' })
    created_at: Date;
    
    @OneToMany(() => Tweet, tweet  => tweet.user)
    tweets: Tweet[];

  
    @OneToMany(() => UserLikedTweets, likedTweet  => likedTweet.user)
    likedTweet: UserLikedTweets[];

    @OneToMany(() => Bookmarked, bookmarkedTweet   => bookmarkedTweet.user)
    bookmarkedTweet: UserLikedTweets[];
    

    @OneToMany(() => Comment, comment  => comment.user)
    comments: Comment[];


    
}
