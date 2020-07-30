import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";
import { MinDate } from "class-validator";

@Entity()
export class PlusState {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("time without time zone", { nullable: true })
  @MinDate(new Date())
  votingEnds: Date;
}
