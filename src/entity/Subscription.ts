import {Entity,Column, CreateDateColumn, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class Subscription {
   @PrimaryGeneratedColumn()
    id: number;
   @Column()
    userId: number;

    @Column()
    followerId: number;

  @CreateDateColumn()
  createdAt: Date;

    
}
