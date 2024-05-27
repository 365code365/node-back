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

    let documentEntities = await selectQueryBuilder.where("ClaimID=:ClaimID and UserID=:UserID",
      {
        ClaimID: "7b06cda3-98ff-4a97-bf8e-145bf3d045c4",
        UserID: "e7ffbfb5-40b6-4874-a29f-dd055429bcfe"
      }).getMany();

    let userEntities = await this.userEntityRepository.findOne({
      where: {
        UserID: "e7ffbfb5-40b6-4874-a29f-dd055429bcfe"
      }

    });
    let arr = []
    for (let i = 0; i < 10; i++) {
      arr.push(userEntities)
    }

    return this.courseCertClaimService.sendMail(documentEntities, arr, "614660823@qq.com")
  }
}
