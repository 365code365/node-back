import {InjectEntityModel} from "@midwayjs/typeorm";
import {CourseCertClaimEntity} from "../../entity/cert/CourseCertClaim.entity";
import {Repository} from "typeorm";
import {Provide} from "@midwayjs/core";
import {UserEntity} from "../../entity/User.entity";
import {DocumentEntity} from "../../entity/cert/Document.entity";
import {CourseCertEntity} from "../../entity/cert/CourseCert.entity";
import {CustomError} from "../../exception/CustomError";
import {ErrorCode, ErrorType} from "../../constant/ErrorCode";

const {v4: uuidv4} = require('uuid');

@Provide()
export class CourseCertClaimService {


  @InjectEntityModel(CourseCertClaimEntity)
  courseCertClaimRepository: Repository<CourseCertClaimEntity>


  @InjectEntityModel(UserEntity)
  userEntityRepository: Repository<UserEntity>;


  @InjectEntityModel(DocumentEntity)
  documentEntityRepository: Repository<DocumentEntity>

  @InjectEntityModel(CourseCertEntity)
  courseCertEntity: Repository<CourseCertEntity>

  async create(courseCertClaim: CourseCertClaimEntity) {

    let queryBuilder = this.courseCertEntity.createQueryBuilder();
    let certEntity: CourseCertEntity = await queryBuilder.where("ID=:id", {id: courseCertClaim.CourseAndCertificationID}).getOne();

    courseCertClaim.ID = uuidv4()
    courseCertClaim.Status = 'Pending'
    courseCertClaim.applyRule = certEntity.applyRule
    await this.courseCertClaimRepository.save(courseCertClaim);

    return 'create success'
  }


  async updateCertClaimEntity(certClaimEntity: CourseCertClaimEntity) {
    let courseCertClaimEntity = await this.getDetail(certClaimEntity);
    courseCertClaimEntity.Remark = certClaimEntity.Remark
    let applyRule = courseCertClaimEntity.applyRule;

    let applyRuleJson = JSON.parse(applyRule);
    for (let i = 0; i < applyRuleJson.length; i++) {

      if (i > 0) {
        let status = applyRuleJson[i - 1].status.toLowerCase();
        if (status == 'waiting' || status == 'error') {
          throw new CustomError(ErrorType.app_error, ErrorCode.app_error)
        }
      }

      if (certClaimEntity.role.toLowerCase() == applyRuleJson[i].aproveRole.toLowerCase()) {
        if ("Pass" == certClaimEntity.Status) {
          applyRuleJson[i].status = "finish"
        } else {
          applyRuleJson[i].status = "error"
        }
      }

    }
    courseCertClaimEntity.applyRule = JSON.stringify(applyRuleJson)
    await this.courseCertClaimRepository.save(courseCertClaimEntity);

    return 'update success'
  }

  async getDetail(certClaimEntity: CourseCertClaimEntity) {

    let queryBuilder = this.courseCertClaimRepository.createQueryBuilder();
    queryBuilder.where("UserID=:UserID and CourseAndCertificationID=:CourseAndCertificationID", {
      UserID: certClaimEntity.UserID,
      CourseAndCertificationID: certClaimEntity.CourseAndCertificationID
    })
    let courseCertClaimEntity = await queryBuilder.getOne();
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
