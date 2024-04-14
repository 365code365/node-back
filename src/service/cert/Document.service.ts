import {InjectEntityModel} from "@midwayjs/typeorm";
import {DocumentEntity} from "../../entity/cert/Document.entity";
import {Repository} from "typeorm";
import {Provide} from "@midwayjs/core";
import {CustomError} from "../../exception/CustomError";
import {ErrorCode, ErrorType} from "../../constant/ErrorCode";

const {v4: uuidv4} = require('uuid');

@Provide()
export class DocumentService {


  @InjectEntityModel(DocumentEntity)
  documentEntityRepository: Repository<DocumentEntity>


  async create(doc: DocumentEntity) {
    doc.ID = uuidv4()
    await this.documentEntityRepository.save(doc);
    return 'create success'
  }

  async list() {
    return this.documentEntityRepository.find();
  }

  async del(doc: DocumentEntity) {

    let res = await this.documentEntityRepository.findOne({
      where: {
        ID: doc.ID
      }
    })
    if (!res) {
      throw new CustomError(ErrorType.has_not_exist, ErrorCode.has_not_exist);
    }
    return await this.documentEntityRepository.remove(res)
  }
}
