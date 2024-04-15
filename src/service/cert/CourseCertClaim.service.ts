import {InjectEntityModel} from "@midwayjs/typeorm";
import {CourseCertClaimEntity} from "../../entity/cert/CourseCertClaim.entity";
import {Repository} from "typeorm";
import {Provide} from "@midwayjs/core";

const {v4: uuidv4} = require('uuid');

@Provide()
export class CourseCertClaimService {


  @InjectEntityModel(CourseCertClaimEntity)
  courseCertClaimRepository: Repository<CourseCertClaimEntity>


  async create(courseCertClaim: CourseCertClaimEntity) {
    courseCertClaim.ID = uuidv4()
    courseCertClaim.Status = 'Pending'
    await this.courseCertClaimRepository.save(courseCertClaim);

    return 'create success'
  }


  async updateCertClaimEntity(certClaimEntity: CourseCertClaimEntity) {

    await this.courseCertClaimRepository.save(certClaimEntity);

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
}
