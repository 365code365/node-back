import {Context, Inject, Provide} from '@midwayjs/core';
import {IUserOptions} from '../interface';
import {UserEntity} from '../entity/User.entity';
import {FindOneOptions, Repository} from 'typeorm';
import {InjectEntityModel} from '@midwayjs/typeorm';
import {CustomError} from '../exception/CustomError';
import {ErrorCode, ErrorType} from '../constant/ErrorCode';
import {TokenEntity} from '../entity/Token.entity';

const {v4: uuidv4} = require('uuid');

@Provide()
export class UserService {

    @InjectEntityModel(UserEntity)
    userEntity: Repository<UserEntity>;

    @InjectEntityModel(TokenEntity)
    tokenEntity: Repository<TokenEntity>;

    @Inject()
    ctx: Context;

    async getUser(options: IUserOptions) {
        return {
            uid: options.uid,
            username: 'mockedName',
            phone: '12345678901',
            email: 'xxx.xxx@xxx.com',
        };
    }

    async login(body: UserEntity) {
        const option: FindOneOptions<UserEntity> = {
            where: {
                FullName: body.FullName,
                PasswordHash: body.PasswordHash,
            },
        };
        const res = await this.userEntity.findOne(option);

        if (res == null) {
            throw new CustomError(ErrorType.NOT_FUND_USER, ErrorCode.NOT_FUND_USER);
        }

        let tokenRes = await this.tokenEntity.findOne({
            where: {
                UserId: res.UserlD
            }
        })
        let randomKey;
        if (tokenRes != null) {
            randomKey = uuidv4();
            tokenRes.token = randomKey
            this.tokenEntity.save(tokenRes)
            //save in ctx
            this.ctx.setAttr(randomKey, randomKey)
        } else {
            let entity = new TokenEntity();
            randomKey = uuidv4()
            entity.ID = randomKey
            entity.UserId = res.UserlD;
            entity.status = 1
            entity.createTime = new Date()
            entity.updateTime = new Date()
            entity.token = randomKey
            this.ctx.setAttr(randomKey, randomKey)
            await this.tokenEntity.save(entity)
        }

        return {
            userId: res.UserlD,
            token: randomKey
        };
    }

    async getAllUser() {
        const count = await this.userEntity.count();
        return count;
    }
}
