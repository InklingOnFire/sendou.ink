import {
  Entity,
  Column,
  CreateDateColumn,
  JoinColumn,
  OneToOne,
} from "typeorm";
import { PlusTier } from "../../types";
import { Length } from "class-validator";
import { User } from "./User";

@Entity()
export class PlusSuggested {
  @Column("enum", { enum: PlusTier })
  plusTier: PlusTier;

  @Column()
  @Length(1, 1000)
  description: string;

  @CreateDateColumn()
  createdAt: Date;

  @OneToOne(() => User, { primary: true })
  @JoinColumn()
  suggester: User;

  @OneToOne(() => User)
  @JoinColumn()
  suggested: User;
}
