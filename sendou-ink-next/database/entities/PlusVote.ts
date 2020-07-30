import { Entity, Column, OneToOne, JoinColumn } from "typeorm";
import { User } from "./User";
import { PlusTier } from "../../types";
import { IsInt, Min, Max } from "class-validator";

@Entity()
export class PlusVote {
  @Column("enum", { enum: PlusTier })
  plusTier: PlusTier;

  @Column("smallint")
  @IsInt()
  @Min(-2)
  @Max(2)
  score: number;

  @Column("smallint", { primary: true })
  @Min(1)
  @Max(12)
  month: number;

  @Column("smallint", { primary: true })
  @Min(2020)
  @Max(new Date().getFullYear())
  year: number;

  @OneToOne(() => User, { primary: true })
  @JoinColumn()
  voter: User;

  @OneToOne(() => User, { primary: true })
  @JoinColumn()
  voted: User;
}
