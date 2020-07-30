import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinTable,
  ManyToMany,
} from "typeorm";
import { UserProfile } from "./UserProfile";
import { Weapon } from "./Weapon";
import { PlusInfo } from "./PlusInfo";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  discordName: string;

  @Column("varchar", { length: 4 })
  discordDiscriminator: string;

  @Column({ nullable: true })
  discordAvatar: string;

  @OneToOne(() => UserProfile)
  profile: UserProfile;

  @ManyToMany(() => Weapon)
  @JoinTable()
  weapons: Weapon[];

  @OneToOne(() => PlusInfo)
  plusInfo: PlusInfo;
}
