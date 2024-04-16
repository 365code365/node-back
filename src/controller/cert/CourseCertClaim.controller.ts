import {Controller, Get, Inject, Post} from "@midwayjs/core";
import {CourseCertClaimEntity} from "../../entity/cert/CourseCertClaim.entity";
import {Body} from "@midwayjs/core/dist/decorator/web/paramMapping";
import {CourseCertClaimService} from "../../service/cert/CourseCertClaim.service";


@Controller("/courseCertClaim")
export class CourseCertClaimController {


  @Inject()
  courseCertClaimService:CourseCertClaimService

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

  @Get('/getListById')
  async getListById(@Body() courseCertClaim: CourseCertClaimEntity) {
     return this.courseCertClaimService.getListById(courseCertClaim)
  }
}
