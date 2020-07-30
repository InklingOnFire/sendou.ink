import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  OneToOne,
  UpdateDateColumn,
} from "typeorm";
import { User } from "./User";
import { Weapon } from "./Weapon";
import { Length, ArrayMinSize, ArrayMaxSize } from "class-validator";
import { Gear } from "./Gear";
import {
  HeadAbility,
  ShoesAbility,
  ClothingAbility,
  StackableAbility,
} from "../../types";

@Entity()
export class Build {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  @Length(1, 100)
  title: string;

  @Column({ nullable: true })
  @Length(1, 1000)
  description: string;

  @Column({ default: false })
  japanese: boolean;

  @Column("enum", {
    enum: HeadAbility,
  })
  headMainAbility: typeof HeadAbility;

  @Column("enum", { enum: StackableAbility, array: true, nullable: true })
  @ArrayMinSize(3)
  @ArrayMaxSize(3)
  headSubAbilities: StackableAbility[];

  @Column("enum", {
    enum: ClothingAbility,
  })
  clothingMainAbility: typeof ClothingAbility;

  @Column("enum", { enum: StackableAbility, array: true, nullable: true })
  @ArrayMinSize(3)
  @ArrayMaxSize(3)
  clothingSubAbilities: StackableAbility[];

  @Column("enum", {
    enum: ShoesAbility,
  })
  shoesMainAbility: typeof ShoesAbility;

  @Column("enum", { enum: StackableAbility, array: true, nullable: true })
  @ArrayMinSize(3)
  @ArrayMaxSize(3)
  shoesSubAbilities: StackableAbility[];

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToOne(() => Weapon)
  @JoinColumn()
  weapon: Weapon;

  @OneToOne(() => Gear, { nullable: true })
  @JoinColumn()
  headGear: Weapon;

  @OneToOne(() => Gear, { nullable: true })
  @JoinColumn()
  clothingGear: Weapon;

  @OneToOne(() => Gear, { nullable: true })
  @JoinColumn()
  shoesGear: Weapon;

  @OneToOne(() => User, { nullable: true })
  @JoinColumn()
  voted: User;
}
