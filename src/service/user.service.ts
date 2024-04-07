import {FORMAT, Inject, Provide} from '@midwayjs/core';
import {IUserOptions} from '../interface';
import {UserEntity} from '../entity/User.entity';
import {Repository} from 'typeorm';
import {InjectEntityModel} from '@midwayjs/typeorm';
import {CustomError} from '../exception/CustomError';
import {ErrorCode, ErrorType} from '../constant/ErrorCode';
import {TokenEntity} from '../entity/Token.entity';
import {Context} from '@midwayjs/koa';

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
                UserId: res.UserID
            }
        })
        let randomKey;
        if (tokenRes != null) {
            randomKey = uuidv4();
            tokenRes.token = randomKey
            this.tokenEntity.save(tokenRes)
            //save in ctx
            this.ctx.session.token = randomKey
        } else {
            let entity = new TokenEntity();
            randomKey = uuidv4()
            entity.ID = randomKey
            entity.UserId = res.UserID;
            entity.status = 1
            entity.createTime = new Date()
            entity.updateTime = new Date()
            entity.token = randomKey
            this.ctx.session.token = randomKey
            await this.tokenEntity.save(entity)
        }
       this.ctx.session.maxAge = FORMAT.MS.ONE_DAY * 30;

        return {
            userId: res.UserID,
            token: randomKey
        };
    }

    async count() {
        const count = await this.userEntity.count();
        return count;
    }

    async getAllUser() {
      return await this.userEntity.find();
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
            body.UserID = uuidv4()
            await this.userEntity.save(body)
            return 'register success'
        }
    }

    async batchInsertUser(body: UserEntity[]) {

      await this.userEntity.save(body)
    }
}
