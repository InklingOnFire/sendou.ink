import { Entity, Column, OneToOne, JoinColumn } from "typeorm";
import {
  IsISO31661Alpha2,
  Length,
  Min,
  Max,
  IsDivisibleBy,
  IsAlphanumeric,
  IsLowercase,
} from "class-validator";
import { User } from "./User";

@Entity()
export class UserProfile {
  @Column({ unique: true })
  discordId: string;

  @Column({ nullable: true })
  twitchName: string;

  @Column({ nullable: true })
  twitterName: string;

  @Column({ nullable: true })
  youtubeId: string;

  @Column({ nullable: true })
  youtubeName: string;

  @Column({ nullable: true })
  @Length(1, 10000)
  bio: string;

  @Column("varchar", { length: 2, nullable: true })
  @IsISO31661Alpha2()
  countryCode: string;

  @Column("smallint", { nullable: true })
  @Min(-50)
  @Max(50)
  @IsDivisibleBy(5)
  stickSens: number;

  @Column("smallint", { nullable: true })
  @Min(-50)
  @Max(50)
  @IsDivisibleBy(5)
  motionSens: number;

  @Column("varchar", { length: 32, nullable: true, unique: true })
  @IsAlphanumeric()
  @IsLowercase()
  @Length(2, 32)
  customTag: string;

  @OneToOne(() => User, { primary: true })
  @JoinColumn()
  user: User;
}
