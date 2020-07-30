import { Entity, Column, JoinColumn, OneToOne } from "typeorm";
import { PlusTier, PlusRegion } from "../../types";
import { User } from "./User";
import { Min, Max } from "class-validator";

@Entity()
export class PlusInfoForResults {
  @Column("enum", { nullable: true, enum: PlusTier })
  membershipStatus: PlusTier;

  @Column("enum", { nullable: true, enum: PlusTier })
  vouchStatus: PlusTier;

  @Column("enum", { nullable: true, enum: PlusRegion })
  region: PlusRegion;

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
  user: User;
}
