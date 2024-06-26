import {Column, Entity, PrimaryColumn} from "typeorm";


@Entity('courseandcertification')
export class CourseCertEntity {


  @PrimaryColumn()
  ID: string
  @Column()
  UserID: string
  @Column()
  UserRole: string
  @Column()
  TitleOfCertification: string
  @Column()
  NameOfTrainingProvider: string
  @Column()
  CourseStart: string
  @Column()
  CourseEnd: string
  @Column()
  CreatedAt: string
  @Column()
  UpdatedAt: string
  //@Column()
  //AdminNum: string
  @Column()
  SubmissionEndDate: string
  @Column()
  SubmissionStartDate: string
  @Column()
  CourseDesc: string
  @Column()
  CourseImage: string
  @Column()
  grade: string

  @Column()
  applyRule: string

  @Column()
  UserlD: string

}
