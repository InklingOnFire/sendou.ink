import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Weapon {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;
}
