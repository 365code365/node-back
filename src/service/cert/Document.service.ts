import {InjectEntityModel} from "@midwayjs/typeorm";
import {DocumentEntity} from "../../entity/cert/Document.entity";
import {Repository} from "typeorm";
import {Provide} from "@midwayjs/core";

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
}
