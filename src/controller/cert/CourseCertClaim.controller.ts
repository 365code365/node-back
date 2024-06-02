import {Controller, Get, Inject, Post} from "@midwayjs/core";
import {CourseCertClaimEntity} from "../../entity/cert/CourseCertClaim.entity";
import {Body} from "@midwayjs/core/dist/decorator/web/paramMapping";
import {CourseCertClaimService} from "../../service/cert/CourseCertClaim.service";
import {InjectEntityModel} from "@midwayjs/typeorm";
import {DocumentEntity} from "../../entity/cert/Document.entity";
import {Repository} from "typeorm";
import {UserEntity} from "../../entity/User.entity";


@Controller("/courseCertClaim")
export class CourseCertClaimController {


  @Inject()
  courseCertClaimService: CourseCertClaimService

  @InjectEntityModel(DocumentEntity)
  documentEntityRepository: Repository<DocumentEntity>


  @InjectEntityModel(UserEntity)
  userEntityRepository: Repository<UserEntity>;

  @Post('/create')
  async create(@Body() courseCertClaim: CourseCertClaimEntity) {
    return this.courseCertClaimService.create(courseCertClaim)
  }

  @Post('/updateCertClaim')
  async updateCertClaim(@Body() courseCertClaim: CourseCertClaimEntity) {
    return this.courseCertClaimService.updateCertClaimEntity(courseCertClaim)
  }

  @Post('/getDetail')
  async getDetail(@Body() courseCertClaim: CourseCertClaimEntity) {
    return await this.courseCertClaimService.getDetail(courseCertClaim)
  }

  @Get('/list')
  async list() {
    return this.courseCertClaimService.list()
  }

  @Post('/getListById')
  async getListById(@Body() courseCertClaim: CourseCertClaimEntity) {
    return this.courseCertClaimService.getListById(courseCertClaim)
  }

  @Post('/getGradeProcess')
  async getGradeProcess(@Body() courseCertClaim: CourseCertClaimEntity) {
    return this.courseCertClaimService.getGradeProcess(courseCertClaim)
  }

  @Post('/sendMail')
  async sendMail() {
    let selectQueryBuilder = this.documentEntityRepository.createQueryBuilder();

    const userIds = [
      "12a3e14f-0e39-466f-a804-eac5c876c241",
       "c55c2069-763c-4b33-b544-7abc9b05380e"
    ];
    let documentEntities = await selectQueryBuilder.where("ClaimID = :ClaimID AND UserID IN (:...userIds)",
      {
        ClaimID: "c2e892a2-86e9-4abf-bba7-dd98e4647d77",
        userIds: userIds
      }).getMany();

    let userEntities = await this.userEntityRepository.findOne({
      where: {
        UserID: "c55c2069-763c-4b33-b544-7abc9b05380e"
      }

    });
    let arr = []
    for (let i = 0; i < 10; i++) {
      arr.push(userEntities)
    }

    return this.courseCertClaimService.sendMail(documentEntities, arr, "yangrd1107@gmail.com")
  }
}
