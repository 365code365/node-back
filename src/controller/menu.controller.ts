import {Controller, Get, Inject, Query} from "@midwayjs/core";
import {MenuService} from "../service/ menu.service";
import {CustomError} from "../exception/CustomError";
import {ErrorCode, ErrorType} from "../constant/ErrorCode";
import {Context} from '@midwayjs/koa';


@Controller('/menu')
export class MenuController {

  @Inject()
  menuService: MenuService

  @Inject()
  ctx: Context;

  /**
   * Acquire all menus of users
   * @param token
   */
  @Get('/list')
  async getMenuList(@Query('token') token: string) {
    let tokenValue: string = this.ctx.session.token
    if (!tokenValue) {
      throw new CustomError(ErrorType.token_not_exist, ErrorCode.token_not_exist)
    }

    return this.menuService.getMenuList(tokenValue)
  }

  /**
   * Acquire all menus of users
   */
  @Get('/getMenuAllList')
  async getMenuAllList() {
    return this.menuService.getMenuAllList()
  }

  /**
   * Acquire all menus of users
   * @param userId
   * @param pageKey
   * @param menuTitle
   */
  @Get('/addMenu')
  async addMenu(@Query('userId') userId: string, @Query('pageKey') pageKey: string, @Query('menuTitle') menuTitle: string) {

    if (!userId) {
      throw new CustomError(ErrorType.this_param_not_empty, ErrorCode.this_param_not_empty)
    }
    if (!pageKey) {
      throw new CustomError(ErrorType.this_param_not_empty, ErrorCode.this_param_not_empty)
    }
    if (!menuTitle) {
      throw new CustomError(ErrorType.this_param_not_empty, ErrorCode.this_param_not_empty)
    }

    return this.menuService.addMenu(userId, pageKey, menuTitle)
  }
}
