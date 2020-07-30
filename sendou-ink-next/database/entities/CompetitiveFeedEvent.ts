import { Entity, Column, JoinColumn, OneToOne } from "typeorm";
import { User } from "./User";
import { Length, MinDate, IsUrl, Contains } from "class-validator";

@Entity()
export class CompetitiveFeedEvent {
  @Column({ primary: true })
  @Length(1, 100)
  name: string;

  @Column({ nullable: true })
  @Length(1, 2000)
  description: string;

  @Column("time without time zone")
  @MinDate(new Date())
  eventStarts: Date;

  @Column()
  @Contains("https://discord.gg/")
  discordInviteUrl: string;

  @Column({ nullable: true })
  @IsUrl()
  pictureUrl: string;

  @OneToOne(() => User)
  @JoinColumn()
  owner: User;
}
