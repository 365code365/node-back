import {Context, Controller, Get, Inject, Query} from "@midwayjs/core";
import {MenuService} from "../service/ menu.service";
import {CustomError} from "../exception/CustomError";
import {ErrorCode, ErrorType} from "../constant/ErrorCode";


@Controller('/menu')
export class MenuController{

  @Inject()
  menuService:MenuService

  @Inject()
  ctx: Context;

  /**
   * Acquire all menus of users
   * @param token
   */
  @Get('/list')
  async getMenuList(@Query('token') token:string){
    let tokenValue:string = this.ctx.getAttr(token);
    if (!tokenValue){
      throw new CustomError(ErrorType.token_not_exist, ErrorCode.token_not_exist)
    }

    return this.menuService.getMenuList(tokenValue)
  }
}
