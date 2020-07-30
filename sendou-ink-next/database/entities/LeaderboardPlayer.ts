import { Entity, OneToOne, JoinColumn, Column } from "typeorm";
import { User } from "./User";
import { LeaderboardType } from "../../types";

@Entity()
export class LeaderboardPlayer {
  @Column("smallint", { default: 0 })
  firstPlaces: number;

  @Column("smallint", { default: 0 })
  secondPlaces: number;

  @Column("smallint", { default: 0 })
  thirdPlaces: number;

  @Column("enum", { enum: LeaderboardType, primary: true })
  type: LeaderboardType;

  @OneToOne(() => User, { primary: true })
  @JoinColumn()
  user: User;
}
