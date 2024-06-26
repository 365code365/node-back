import {Controller, Get, Inject, Post} from "@midwayjs/core";
import {CourseCertEntity} from "../../entity/cert/CourseCert.entity";
import {CourseCertService} from "../../service/cert/CourseCert.service";
import {Body} from "@midwayjs/core/dist/decorator/web/paramMapping";


@Controller("/cert")
export class CreateCertController {


    @Inject()
    certService: CourseCertService

    @Post('/create')
    async createCert(@Body() cert: CourseCertEntity) {
        return this.certService.create(cert)
    }

    @Post('/list')
    async list(@Body() query: any) {
        return this.certService.list(query)
    }

    @Get('/listAll')
    async listAll() {
        return this.certService.listAll()
    }

    @Post('/del')
    async del(@Body() cert: CourseCertEntity) {
        return this.certService.del(cert)
    }

    @Post('/getDetail')
    async getDetail(@Body() cert: CourseCertEntity) {
        return this.certService.getDetail(cert)
    }

}
