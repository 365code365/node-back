import {Column, Entity, PrimaryColumn} from "typeorm";


@Entity('courseandcertificationclaim')
export class CourseCertClaimEntity {


  @PrimaryColumn()
  ID: string
  @Column()
  UserlD: string
  @Column()
  CourseAndCertificationlD: string
  @Column()
  TotalClaimAmount: string
  @Column()
  TotalAmountSpent: string
  @Column()
  Status: string
  @Column()
  ExaminationDate: string
  @Column()
  Remark: string


}
