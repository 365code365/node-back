import {Column, Entity, PrimaryColumn} from "typeorm";


@Entity('courseandcertification')
export class CourseCertEntity {


  @PrimaryColumn()
  ID: string
  @Column()
  UserlD: string
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
  @Column()
  AdminNum: string
  @Column()
  SubmissionEndDate: string
  @Column()
  SubmissionStartDate: string


}
