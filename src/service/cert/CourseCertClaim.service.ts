import {InjectEntityModel} from "@midwayjs/typeorm";
import {CourseCertClaimEntity} from "../../entity/cert/CourseCertClaim.entity";
import {Repository} from "typeorm";
import {Provide} from "@midwayjs/core";
import {UserEntity} from "../../entity/User.entity";
import {DocumentEntity} from "../../entity/cert/Document.entity";
import {CourseCertEntity} from "../../entity/cert/CourseCert.entity";
import {CustomError} from "../../exception/CustomError";
import {ErrorCode, ErrorType} from "../../constant/ErrorCode";
import EmailService from "../../util/Mailer";
import FileService from "../../util/FileService";

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
          if (applyRuleJson[i].status == 'finish') {
            continue
          }
          applyRuleJson[i].status = "finish"

          if (applyRuleJson[i].aproveRoleName == 'IMDA') {
            let mailer: EmailService = new EmailService()


            let selectQueryBuilder = this.documentEntityRepository.createQueryBuilder();
            let documentEntities = await selectQueryBuilder.where("ClaimID=:ClaimID and UserID=:UserID",
              {
                ClaimID: certClaimEntity.CourseAndCertificationID,
                UserID: certClaimEntity.UserID
              }).getMany();
            console.log('many', documentEntities)

            let fileService = new FileService();

            let arr = []
            for (let j = 0; j < documentEntities.length; j++) {
              let fileName = "attachments_" + j + ".jpg";

              let filePath = await fileService.saveBase64ToFile("data:image/png;base64,"+documentEntities[j].FileContent, fileName);
              arr.push({
                filename: fileName,
                path: filePath
              })
            }


            const mailOptions = {
              from: '896696554@qq.com',
              to: 'yangrd1107@gmail.com',
              subject: 'this attachments',
              text: 'this attachments',
              attachments: arr,
            };
            mailer.sendMail(mailOptions)
          }

          if (certClaimEntity.role.toLowerCase() == 'nyp' && i == applyRuleJson.length - 2) {
            applyRuleJson[i + 1].status = "finish"
          }
        } else {
          if (certClaimEntity.role.toLowerCase() == 'nyp' && i == applyRuleJson.length - 2) {
            applyRuleJson[i + 1].status = "waiting"
          }
          applyRuleJson[i].status = "error"
        }
        break
      }


    }
    // courseCertClaimEntity.applyRule = JSON.stringify(applyRuleJson)
    // await this.courseCertClaimRepository.save(courseCertClaimEntity);

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
      list = await this.documentEntityRepository.find({where: {ClaimID: courseCertClaimEntity.CourseAndCertificationID}});
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
