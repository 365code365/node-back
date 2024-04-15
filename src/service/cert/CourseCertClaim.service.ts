import {InjectEntityModel} from "@midwayjs/typeorm";
import {CourseCertClaimEntity} from "../../entity/cert/CourseCertClaim.entity";
import {Repository} from "typeorm";
import {Provide} from "@midwayjs/core";
import {UserEntity} from "../../entity/User.entity";

const {v4: uuidv4} = require('uuid');

@Provide()
export class CourseCertClaimService {


  @InjectEntityModel(CourseCertClaimEntity)
  courseCertClaimRepository: Repository<CourseCertClaimEntity>


  @InjectEntityModel(UserEntity)
  userEntityRepository: Repository<UserEntity>;


  async create(courseCertClaim: CourseCertClaimEntity) {
    courseCertClaim.ID = uuidv4()
    courseCertClaim.Status = 'Pending'
    await this.courseCertClaimRepository.save(courseCertClaim);

    return 'create success'
  }


  async updateCertClaimEntity(certClaimEntity: CourseCertClaimEntity) {
    let courseCertClaimEntity = await this.getDetail(certClaimEntity);
    courseCertClaimEntity.Remark = certClaimEntity.Remark
    courseCertClaimEntity.Status = certClaimEntity.Status
    await this.courseCertClaimRepository.save(courseCertClaimEntity);

    return 'create success'
  }

  async getDetail(certClaimEntity: CourseCertClaimEntity) {
    return await this.courseCertClaimRepository.findOne({
      where: {
        UserID: certClaimEntity.UserID,
        CourseAndCertificationID: certClaimEntity.CourseAndCertificationID
      }
    });
  }

  async list() {
    return await this.courseCertClaimRepository.find();
  }

  async getListById(courseCertClaim: CourseCertClaimEntity) {
    let list = await this.courseCertClaimRepository.find({
      where: {
        CourseAndCertificationID: courseCertClaim.CourseAndCertificationID
      }
    });

    let arr = []
    for (let i = 0; i < list.length; i++) {
      let item = list[i];

      let userEntity = await this.userEntityRepository.findOne({
        where: {
          UserID: item.UserID
        }
      });

       let option = {
          label:userEntity.FullName,
          value:userEntity.UserID,
       }
      arr.push(option)
    }


    return arr
  }
}
