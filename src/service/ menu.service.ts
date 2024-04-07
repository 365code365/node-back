import {Provide} from "@midwayjs/core";
import {Repository} from "typeorm";
import {MenuEntity} from "../entity/Menu.entity";
import {InjectEntityModel} from "@midwayjs/typeorm";
import {TokenEntity} from "../entity/Token.entity";
import {CustomError} from "../exception/CustomError";
import {ErrorCode, ErrorType} from "../constant/ErrorCode";

const {v4: uuidv4} = require('uuid');

@Provide()
export class MenuService {


  @InjectEntityModel(MenuEntity)
  menuEntityRepository: Repository<MenuEntity>


  @InjectEntityModel(TokenEntity)
  tokenEntityRepository: Repository<TokenEntity>;


  async getMenuList(tokenValue: string) {


    let tokenRes = await this.tokenEntityRepository.findOne({
      where: {
        token: tokenValue
      }
    })
    if (!tokenRes) {
      throw new CustomError(ErrorType.token_not_exist, ErrorCode.token_not_exist)
    }
    let userId = tokenRes.UserId;

    return this.menuEntityRepository.findBy({
      UserID: userId
    })
  }


  async addMenu(userId: string, pageKey: string, menuTitle: string) {
    let menuEntity = new MenuEntity();
    menuEntity.ID = uuidv4()
    menuEntity.UserID = userId;
    menuEntity.PageKey = pageKey;
    menuEntity.MenuTitle = menuTitle;
    await this.menuEntityRepository.save(menuEntity)
  }
}