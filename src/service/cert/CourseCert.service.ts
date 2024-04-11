import {Provide} from "@midwayjs/core";
import {InjectEntityModel} from "@midwayjs/typeorm";
import {CourseCertEntity} from "../../entity/cert/CourseCert.entity";
import {Repository} from "typeorm";
import {UserEntity} from "../../entity/User.entity";
import {CustomError} from "../../exception/CustomError";
import {ErrorCode, ErrorType} from "../../constant/ErrorCode";

const {v4: uuidv4} = require('uuid');


@Provide()
export class CourseCertService {


  @InjectEntityModel(CourseCertEntity)
  courseCertEntity: Repository<CourseCertEntity>


  @InjectEntityModel(UserEntity)
  userEntityRepository: Repository<UserEntity>;


  async create(cert: CourseCertEntity) {
    cert.ID = uuidv4()
    console.log('cert', cert.NameOfTrainingProvider)

    let user = await this.userEntityRepository.findOne({
      where: {
        UserID: cert.UserlD
      }
    });

    cert.UserRole = user.Role

    let certRes = await this.courseCertEntity.findOne({
      where: {
        TitleOfCertification: cert.TitleOfCertification
      }
    })
    if (certRes) {
      throw new CustomError(ErrorType.has_exist, ErrorCode.has_exist);
    }

    let res = await this.courseCertEntity.save(cert)
    return res;
  }

  async list(cert: any) {

    return await this.courseCertEntity.findBy({
      UserlD: cert.UserlD
    })
  }
}
