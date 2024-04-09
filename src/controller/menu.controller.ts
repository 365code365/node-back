import {Controller, Get, Inject, Post, Query} from "@midwayjs/core";
import {MenuService} from "../service/ menu.service";
import {CustomError} from "../exception/CustomError";
import {ErrorCode, ErrorType} from "../constant/ErrorCode";
import {Context} from '@midwayjs/koa';
import {Body} from "@midwayjs/core/dist/decorator/web/paramMapping";
import {MenuEntity} from "../entity/Menu.entity";


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
  async addMenu(@Query('userId') userId: string,
                @Query('pageKey') pageKey: string,
                @Query('menuTitle') menuTitle: string,
                @Query('permsFlag') permsFlag: string) {

    if (!userId) {
      throw new CustomError(ErrorType.this_param_not_empty, ErrorCode.this_param_not_empty)
    }
    if (!pageKey) {
      throw new CustomError(ErrorType.this_param_not_empty, ErrorCode.this_param_not_empty)
    }
    if (!menuTitle) {
      throw new CustomError(ErrorType.this_param_not_empty, ErrorCode.this_param_not_empty)
    }

    return this.menuService.addMenu(userId, pageKey, menuTitle, permsFlag)
  }

  /**
   * Acquire all menus of users
   * @param menuMenuEntity
   */
  @Post('/batchAddMenu')
  async batchAddMenu(@Body() menuMenuEntity: MenuEntity[]) {
    menuMenuEntity.forEach(item => {
      this.menuService.addMenu(item.UserID, item.PageKey, item.PageKey, item.BtnPermitsFlag)
    })
    return "success"
  }
}
