import {Inject, Controller, Get, Query} from '@midwayjs/core';
import {Context} from '@midwayjs/koa';
import {UserService} from '../service/user.service';
import {BaseController} from "./base.controller";

@Controller('/api')
export class APIController extends BaseController{
  @Inject()
  ctx: Context;

  @Inject()
  userService: UserService;

  @Get('/get_user')
  async getUser(@Query('uid') uid) {
    const user = await this.userService.getUser({uid});
    return {success: true, message: 'OK', data: user};
  }

  @Get('/getAllUser')
  async getAllUser(@Query('uid') uid) {
    const count = await this.userService.getAllUser();
    return {success: true, message: 'OK', data: count};
  }

}
