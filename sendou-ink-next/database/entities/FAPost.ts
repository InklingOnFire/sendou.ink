import {
  Entity,
  Column,
  OneToOne,
  JoinColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
} from "typeorm";
import { User } from "./User";
import { CanVC } from "../../types";
import { Length } from "class-validator";

@Entity()
export class FAPost {
  @Column("enum", { enum: CanVC })
  canVC: CanVC;

  @Column()
  frontline: boolean;

  @Column()
  midline: boolean;

  @Column()
  backline: boolean;

  @Column({ nullable: true })
  @Length(1, 250)
  activity: string;

  @Column({ nullable: true })
  @Length(1, 250)
  experience: string;

  @Column({ nullable: true })
  @Length(1, 250)
  lookingFor: string;

  @Column({ nullable: true })
  @Length(1, 1000)
  freeWord: string;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToOne(() => User, { primary: true })
  @JoinColumn()
  user: User;

  @ManyToMany(() => FAPost)
  @JoinTable()
  likedPosts: FAPost[];
}
