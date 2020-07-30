import { Entity, Column, JoinColumn, OneToOne } from "typeorm";
import { PlusTier, PlusRegion } from "../../types";
import { User } from "./User";

@Entity()
export class PlusInfo {
  @Column("enum", { nullable: true, enum: PlusTier })
  membershipStatus: PlusTier;

  @Column("enum", { nullable: true, enum: PlusTier })
  vouchStatus: PlusTier;

  @Column("enum", { nullable: true, enum: PlusRegion })
  region: PlusRegion;

  @Column({ nullable: true, default: false })
  canVouch: boolean;

  @Column("time without time zone", { nullable: true })
  canVouchAgainAfter: Date;

  @OneToOne(() => User, { primary: true })
  @JoinColumn()
  user: User;
}
