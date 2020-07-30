import { IsUrl } from "class-validator";
import { Column, Entity } from "typeorm";
import { LinkType } from "../../types";

@Entity()
export class LeaderboardPlayer {
  @Column({ primary: true })
  @IsUrl()
  url: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column("enum", { enum: LinkType })
  type: LinkType;
}
