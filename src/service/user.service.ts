import {Provide} from '@midwayjs/core';
import {IUserOptions} from '../interface';
import {UserEntity} from "../entity/plat/User.entity";
import {FindOneOptions, Repository} from "typeorm";
import {InjectEntityModel} from "@midwayjs/typeorm";
import {CustomError} from "../exception/CustomError";
import {ErrorCode, ErrorType} from "../constant/ErrorCode";

@Provide()
export class UserService {


    @InjectEntityModel(UserEntity)
    userEntity: Repository<UserEntity>;

    async getUser(options: IUserOptions) {
        return {
            uid: options.uid,
            username: 'mockedName',
            phone: '12345678901',
            email: 'xxx.xxx@xxx.com',
        };
    }


    async login(body: UserEntity) {

        let option: FindOneOptions<UserEntity> = {
            where: {
                'FullName': body.FullName,
                'PasswordHash': body.PasswordHash
            }
        }
        let res = await this.userEntity.findOne(option)

        if (res == null) {
            throw new CustomError(ErrorType.NOT_FUND_USER, ErrorCode.NOT_FUND_USER)
        }

        return res
    }


    async getAllUser() {
        const count = await this.userEntity.count()
        return count
    }
}
