import {Controller, Inject, Post} from "@midwayjs/core";
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
}
