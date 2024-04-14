import {Controller, Get, Inject, Post} from "@midwayjs/core";
import {Body} from "@midwayjs/core/dist/decorator/web/paramMapping";
import {DocumentEntity} from "../../entity/cert/Document.entity";
import {DocumentService} from "../../service/cert/Document.service";


@Controller('/document')
export class DocumentController {

  @Inject()
  documentService:DocumentService

  @Post('/create')
  async create(@Body() doc: DocumentEntity) {
    return  this.documentService.create(doc)
  }

  @Get('/list')
  async list() {
    return  this.documentService.list()
  }
  @Post('/del')
  async del(@Body() doc: DocumentEntity) {
    return  this.documentService.del(doc)
  }

}
