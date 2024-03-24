import {Provide} from "@midwayjs/core";
import {InjectEntityModel} from "@midwayjs/typeorm";
import {CourseCertEntity} from "../../entity/cert/CourseCert.entity";
import {Repository} from "typeorm";

const {v4: uuidv4} = require('uuid');


@Provide()
export class CourseCertService {


    @InjectEntityModel(CourseCertEntity)
    courseCertEntity: Repository<CourseCertEntity>


    async create(cert: CourseCertEntity) {
        cert.ID = uuidv4()
        console.log('cert', cert.NameOfTrainingProvider)
        this.courseCertEntity.save(cert)
        return 'create success';
    }

    async list(cert: any) {

        return await this.courseCertEntity.findBy({
            UserlD: cert.UserlD
        })
    }
}
