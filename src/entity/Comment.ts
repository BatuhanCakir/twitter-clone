import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne} from "typeorm";
import { Tweet } from "./Tweet";
import { User } from "./User";

@Entity()
export class Comment {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    content: string;

  @Column()
  userId: number;
  
  @Column()
    tweetId: number;
  
  @CreateDateColumn({ name: 'created_at' })
  created_at: Date;
  
  
  
  
  @ManyToOne(() => Tweet, tweet => tweet.comments )
  tweet: Tweet;

  @ManyToOne(() => User, user => user.comments )
  user: User;

}