import {Column, Entity, PrimaryColumn} from "typeorm";


@Entity('document')
export class DocumentEntity {


  @PrimaryColumn()
  ID: string
  @Column()
  ClaimType: string
  @Column()
  ClaimlD: string
  @Column()
  UserlD: string
  @Column()
  DocumentType: string
  @Column()
  Date: string
  @Column()
  Filenare: string
  @Column()
  Description: string
  @Column()
  Title: string
  @Column()
  RejectionReason: string
  @Column()
  Status: string


}
