import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Gear {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;
}
