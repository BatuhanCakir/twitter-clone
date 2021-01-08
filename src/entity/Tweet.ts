import { Bookmarked } from './Bookmarked';
import { Comment } from './Comment';
import { User } from './User';

import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, OneToMany} from "typeorm";
import { UserLikedTweets } from './UserLikedTweet';


@Entity()
export class Tweet {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    content: string;

    @Column({nullable:true})
    retweets?: number;
  
    @Column()
    likes: number ;
  
  
  
  
  @Column()
  userId: number;

   @Column({nullable:true})
  userName: string;
  
  @ManyToOne(() => User, user => user.tweets)
  user: User;

 


  @OneToMany(() => UserLikedTweets, likedUser => likedUser.tweet)
  likedUser: UserLikedTweets;

   @OneToMany(() => Bookmarked, bookmarked => bookmarked.tweet)
  bookmarkedUser: Bookmarked;
  
  @OneToMany(() => Comment, comment => comment.tweet)
  comments: Comment[];
  
  
  
  @CreateDateColumn({ name: 'created_at' })
  created_at: Date;
}
