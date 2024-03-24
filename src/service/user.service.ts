import {Context, Inject, Provide} from '@midwayjs/core';
import {IUserOptions} from '../interface';
import {UserEntity} from '../entity/User.entity';
import {Repository} from 'typeorm';
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

        const res = await this.userEntity.findOne({
            where: {
                FullName: body.FullName,
                PasswordHash: body.PasswordHash,
            },
        });

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
            this.ctx.setAttr(res.UserlD,res.UserlD)
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
            this.ctx.setAttr(res.UserlD,res.UserlD)
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

    async register(body: UserEntity) {

        if (body.PasswordHash == null || body.PasswordHash == '') {
            throw new CustomError(ErrorType.password_is_empty, ErrorCode.password_is_empty);
        }

        const res = await this.userEntity.findOne({
            where: {
                FullName: body.FullName,
            },
        });
        if (res != null) {
            throw new CustomError(ErrorType.USER_HAS_EXIST, ErrorCode.USER_HAS_EXIST);
        } else {
            body.UserlD = uuidv4()
            await this.userEntity.save(body)
            return 'register success'
        }
    }
}
