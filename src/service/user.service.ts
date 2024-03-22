import {Provide} from '@midwayjs/core';
import {IUserOptions} from '../interface';
import {UserEntity} from "../entity/User.entity";
import {Repository} from "typeorm";
import {InjectEntityModel} from "@midwayjs/typeorm";

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


    async getAllUser() {
        const  count = await this.userEntity.count()
        return count
    }
}
