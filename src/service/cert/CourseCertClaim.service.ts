import {InjectEntityModel} from "@midwayjs/typeorm";
import {CourseCertClaimEntity} from "../../entity/cert/CourseCertClaim.entity";
import {Repository} from "typeorm";
import {Provide} from "@midwayjs/core";
import {UserEntity} from "../../entity/User.entity";
import {DocumentEntity} from "../../entity/cert/Document.entity";

const {v4: uuidv4} = require('uuid');

@Provide()
export class CourseCertClaimService {


  @InjectEntityModel(CourseCertClaimEntity)
  courseCertClaimRepository: Repository<CourseCertClaimEntity>


  @InjectEntityModel(UserEntity)
  userEntityRepository: Repository<UserEntity>;


  @InjectEntityModel(DocumentEntity)
  documentEntityRepository: Repository<DocumentEntity>

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
    //todo status = 'finsh' send email
    await this.courseCertClaimRepository.save(courseCertClaimEntity);

    return 'update success'
  }

  async getDetail(certClaimEntity: CourseCertClaimEntity) {
    let courseCertClaimEntity = await this.courseCertClaimRepository.findOne({
      where: {
        UserID: certClaimEntity.UserID,
        CourseAndCertificationID: certClaimEntity.CourseAndCertificationID
      }
    });
    let list = []
    if (courseCertClaimEntity) {
      list = await this.documentEntityRepository.find({where: {ClaimlD: courseCertClaimEntity.CourseAndCertificationID}});
    }

    let userEntity = await this.userEntityRepository.findOne({where: {UserID: certClaimEntity.UserID}});


    return {
      ...userEntity, ...courseCertClaimEntity ? courseCertClaimEntity : new CourseCertClaimEntity(),
      documentList: list
    }
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
        label: userEntity.FullName,
        value: userEntity.UserID,
      }
      arr.push(option)
    }


    return arr
  }
}
