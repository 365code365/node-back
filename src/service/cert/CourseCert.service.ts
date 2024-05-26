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
        UserID: cert.UserID
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


    cert.applyRule = "[\n" +
      "    {\n" +
      "        \"aproveRole\": \"student\",\n" +
      "        \"aproveRoleName\": \"student\",\n" +
      "        \"order\": 1,\n" +
      "        \"status\": \"finish\",\n" +
      "        \"desc\": \"student submit\"\n" +
      "    },\n" +
      "    {\n" +
      "        \"aproveRole\": \"Teacher\",\n" +
      "        \"aproveRoleName\": \"Teacher\",\n" +
      "        \"order\": 2,\n" +
      "        \"status\": \"waiting\",\n" +
      "        \"desc\": \"Submitted to teacher\"\n" +
      "    },\n" +
      "    {\n" +
      "        \"aproveRole\": \"SIT\",\n" +
      "        \"aproveRoleName\": \"SIT\",\n" +
      "        \"order\": 3,\n" +
      "        \"status\": \"waiting\",\n" +
      "        \"desc\": \"Submitted to SlT Admin\"\n" +
      "    },\n" +
      "    {\n" +
      "        \"aproveRole\": \"NYP\",\n" +
      "        \"aproveRoleName\": \"NYP\",\n" +
      "        \"order\": 4,\n" +
      "        \"status\": \"waiting\",\n" +
      "        \"desc\": \"Submitted to NYP Admin\"\n" +
      "    },\n" +
      "    {\n" +
      "        \"aproveRole\": \"NYP\",\n" +
      "        \"aproveRoleName\": \"IMDA\",\n" +
      "        \"order\": 5,\n" +
      "        \"status\": \"waiting\",\n" +
      "        \"desc\": \"Submitted to IMDA Company\"\n" +
      "    },\n" +
      "    {\n" +
      "        \"aproveRole\": \"NYP\",\n" +
      "        \"aproveRoleName\": \"Account\",\n" +
      "        \"order\": 6,\n" +
      "        \"status\": \"waiting\",\n" +
      "        \"desc\": \"Waiting to CollectClaim\"\n" +
      "    },\n" +
      "    {\n" +
      "        \"aproveRole\": \"end\",\n" +
      "        \"order\": 7,\n" +
      "        \"status\": \"waiting\",\n" +
      "        \"desc\": \"apply end\"\n" +
      "    }\n" +
      "]"
    let res = await this.courseCertEntity.save(cert)
    return res;
  }

  async list(cert: any) {

    return await this.courseCertEntity.findBy({
      UserID: cert.UserID
    })
  }

  async listAll() {
    return await this.courseCertEntity.find()
  }

  async del(cert: CourseCertEntity) {
    const entityToRemove = await this.courseCertEntity.findOne({
      where: {
        ID: cert.ID
      }
    });
    if (entityToRemove) {
      return await this.courseCertEntity.remove(entityToRemove)
    }

    return 'del success'
  }

  async getDetail(cert: CourseCertEntity) {
    let queryBuilder = this.courseCertEntity.createQueryBuilder();
    return  await queryBuilder.where("ID=:id", {id: cert.ID}).getOne();
  }
}
