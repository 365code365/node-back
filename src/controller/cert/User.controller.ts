import {Controller, Get, Inject, Post} from "@midwayjs/core";
import {UserService} from "../../service/user.service";
import {Body} from "@midwayjs/core/dist/decorator/web/paramMapping";
import {UserEntity} from "../../entity/User.entity";

@Controller('/user')
  export class UserController{


  @Inject()
  userService: UserService;

  @Post('/createUser')
  async login(@Body() body: UserEntity[]) {
    let res = this.userService.batchInsertUser(body)
    return res
  }


  @Get('/list')
  async list() {
    let res = this.userService.list()
    return res
  }

}
