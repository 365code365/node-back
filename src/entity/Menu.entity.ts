import {Column, Entity, PrimaryColumn} from "typeorm";


@Entity('menu')
export class MenuEntity {

  @PrimaryColumn()
  ID: string;
  @Column()
  MenuTitle: string;
  @Column()
  PageKey: string;

  @Column()
  UserID: string;

  @Column()
  BtnPermitsFlag: string;
}
