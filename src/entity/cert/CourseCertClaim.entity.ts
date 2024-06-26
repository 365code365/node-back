import {Column, Entity, PrimaryColumn} from "typeorm";


@Entity('courseandcertificationclaim')
export class CourseCertClaimEntity {


  @PrimaryColumn()
  ID: string
  @Column()
  UserID: string
  @Column()
  CourseAndCertificationID: string
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

  @Column()
  applyRule: string

  /**
   * role
   */
  role: string

  /**
   * role
   */
  @Column()
  grade: string

}
