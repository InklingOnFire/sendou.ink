import { Entity, Column, ManyToOne } from "typeorm";
import { Weapon } from "./Weapon";
import { Min, Max, IsNumberString } from "class-validator";
import { RankedMode } from "../../types";

@Entity()
export class Top500Placement {
  @Column()
  playerName: string;

  @Column({ primary: true })
  @IsNumberString()
  playerId: string;

  @ManyToOne(() => Weapon)
  weapon: Weapon;

  @Column("smallint")
  @Min(1)
  @Max(500)
  rank: number;

  @Column("enum", { enum: RankedMode, primary: true })
  mode: RankedMode;

  @Column("decimal", { precision: 1 })
  @Min(2200)
  @Max(3200)
  xPower: number;

  @Column("smallint", { primary: true })
  @Min(1)
  @Max(12)
  month: number;

  @Column("smallint", { primary: true })
  @Min(2018)
  @Max(new Date().getFullYear())
  year: number;
}
