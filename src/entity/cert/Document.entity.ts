import {Column, Entity, PrimaryColumn} from "typeorm";


@Entity('document')
export class DocumentEntity {


  @PrimaryColumn()
  ID: string
  @Column()
  ClaimType: string
  @Column()
  ClaimID: string
  @Column()
  UserID: string
  @Column()
  DocumentType: string
  @Column()
  Date: Date
  @Column()
  Filename: string
  @Column()
  Description: string
  @Column()
  Title: string
  @Column()
  RejectionReason: string
  @Column()
  Status: string
  @Column()
  FileContent: string


}
